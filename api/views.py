import aiohttp
import asyncio
import environ
import json
import random
from django.conf import settings
from django.http import HttpRequest, JsonResponse
from django.db.models.query import QuerySet
from django.core.serializers import serialize
from asgiref.sync import sync_to_async
from .models import *


env = environ.Env()
env.read_env(str(settings.BASE_DIR / ".env"))
map_my_india_api = "https://atlas.mapmyindia.com"
map_my_india_ids = env.list("MAP_MY_INDIA_IDS")
map_my_india_secrets = env.list("MAP_MY_INDIA_SECRETS")
map_my_india_idx = 0
token_api = "/api/security/oauth/token"
nearby_api = "/api/places/nearby/json"
default_json_response = JsonResponse({"Forbidden": "wrong method"}, status=403)


async def get_auth_header(session: aiohttp.ClientSession) -> str:
    """Generates tokens by cycling through all ids and secrets"""
    global map_my_india_idx
    async with session.post(
        url=map_my_india_api + token_api,
        data={
            "grant_type": "client_credentials",
            "client_id": map_my_india_ids[map_my_india_idx],
            "client_secret": map_my_india_secrets[map_my_india_idx],
        },
    ) as res:
        map_my_india_idx = (map_my_india_idx + 1) % len(map_my_india_ids)
        res_json = await res.json()
        return res_json["token_type"] + " " + res_json["access_token"]


async def get_request_data(request: HttpRequest, method: str, **kwargs) -> dict:
    """Checks if the request contains the required data"""
    data = {}
    for key, val_type in kwargs.items():
        val = request.__getattribute__(method).get(key)
        if val is None:
            return {"Bad Request": f"{key} missing"}
        try:
            val = val_type(val)
        except ValueError as _:
            return {"Bad Request": f"{key} must be {val_type.__name__}"}
        data[key] = val
    return data


async def json_serializer(queryset: QuerySet) -> list[dict]:
    qjsons_str = await sync_to_async(serialize)("json", queryset)
    qjsons = json.loads(qjsons_str)
    for qjson in qjsons:
        qjson.pop("model")
        qjson.update(qjson.pop("fields"))
    return qjsons


# Create your views here.


async def index(request: HttpRequest):
    return default_json_response


# pharmacy realated views


async def get_nearby_pharmacies(session: aiohttp.ClientSession, location: str) -> dict:
    """Gets nearby pharmacies from mapmyindia api"""
    async with session.get(
        url=map_my_india_api + nearby_api,
        headers={
            "Authorization": await get_auth_header(session),
        },
        params={
            "keywords": "pharmacy",
            "refLocation": location,
        },
    ) as res:
        return await res.json()


async def pharmacy(request: HttpRequest):
    data, nearby_pharmacies = await asyncio.gather(
        get_request_data(request, "GET", latitude=str, longitude=str),
        sync_to_async(request.session.get)("nearby_pharmacies"),
    )
    if "Bad Request" in data:
        return JsonResponse(
            data,
            status=400,
        )
    location = data["latitude"] + "," + data["longitude"]
    if nearby_pharmacies is not None:
        # was present in session
        return JsonResponse(
            {"nearby_pharmacies": nearby_pharmacies},
            status=200,
        )
    # not in session
    async with aiohttp.ClientSession() as session:
        # send request till we get response
        res = await get_nearby_pharmacies(session, location)
        while "suggestedLocations" not in res:
            res = await get_nearby_pharmacies(session, location)
        nearby_pharmacies = res["suggestedLocations"]
        # fill response with images and items
        items = await sync_to_async(Item.objects.all)()
        items_json = await json_serializer(items)
        random.shuffle(items_json)
        item_start_idx = 0
        item_skip = len(items_json) // len(nearby_pharmacies)
        for nearby_pharmacy in nearby_pharmacies:
            nearby_pharmacy["items"] = items_json[
                item_start_idx : item_start_idx + item_skip
            ]
            item_start_idx += item_skip
            nearby_pharmacy["image_url"] = items_json[item_start_idx - 1]["image_url"]
        request.session["nearby_pharmacies"] = nearby_pharmacies
        return JsonResponse({"nearby_pharmacies": nearby_pharmacies}, status=200)
