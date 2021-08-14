# MedGuide
## Inspiration
During covid-19 people were under a lot of mental stress because they could not access medical facilities, which include access to medicines, consultancy and much more as freely as they could before. Also, previously doctors prescribed medicines without the knowledge of availability and cost of them near the patient which caused inconvenience to many people.

## What it does
Our App allows the patient  to consult with the doctor regarding the medicines availability and prices of medicine nearby the patient, and discuss the total cost of the prescription with the doctor. ( So that doctor can suggest better alternative ).

## How we built it
- Backend : **Django**
- Frontend : **React**
- VC Server : **Node Js**
- Nearby Api : [**mapmyindia**](https://www.mapmyindia.com/api/advanced-maps/doc/nearby-api#/)

## Challenges we ran into
- ### Using django asgi :
    - Most api(s) in django use django-rest-framework which does not support async, so we have do all its work our self.
    - Using django ORM async.
    - Using djnago sessions async.
    - Using django auth async.

- ### Integrating django with React :
    - using the same session for requests in React.
    - bypassing cors in django.
    - making react use django csrf tokens.
    - using url encoded data in React.

- ### Using mapmyindia api :
    - nearby api had a small limit for free use.
    - using their token based auth.

- ### Using Sawo :
    - Using sawo auth in django and react.
    - Using sawo integration documentation.

## Accomplishments that we're proud of
We are proud that we were able to address an important problem and build a product that could help solve it.

## What we learned
We learned from every challenged we faced.
- Using django asgi
- Integrating django with React
- Using mapmyindia api
- Using Sawo 

## What's next for MedGuide
- Adding delivery feature 
- Adding real time driver track
- Categorising medicines
- Adding OAuth2
- Integrating Google Maps
- Adding chat to VC
- Read prescription from image

 ### Contributors :
<!-- readme: contributors -start -->
<table>
<tr>
    <td align="center">
        <a href="https://github.com/manan2110">
            <img src="https://avatars.githubusercontent.com/u/55996661?v=4" width="100;" alt="manan2110"/>
            <br />
            <sub><b>Manan Gyanchandani</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/Arsh-ak7">
            <img src="https://avatars.githubusercontent.com/u/54078399?v=4" width="100;" alt="Arsh-ak7"/>
            <br />
            <sub><b>Arsh Kumar</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/Ayush6602">
            <img src="https://avatars.githubusercontent.com/u/54628493?v=4" width="100;" alt="Ayush6602"/>
            <br />
            <sub><b>Ayush Das</b></sub>
        </a>
    </td></tr>
</table>
<!-- readme: contributors -end -->
