## Online Booking System API using Node.js - README

This project is an online booking system API that allows users to make reservations for hotels, flights, and rental cars. The API is built using Node.js, Express, and MongoDB. This README provides a step-by-step guide to installing and using the API.

* Installation

Clone the repository to your local machine using the following command:


`git clone ${ https://github.com/saurabhdixit93/booking-system }`


* Install the required dependencies using the following command:

`npm install`

* Start the server using the following command:

`npm start`

# API Requests and Endpoints
<br>

* base Url - `localhost:5000/`

* The following are the API requests and their respective endpoints that can be made with this

# booking system API:

* Authentication Endpoints

1. Register
<br>

`-` Creates a new user account with an email and password.

> Endpoint: POST `/api/user/create-account`
Request Body:

`{
  "email": "example@example.com",
  "password": "examplepassword"
}`


> Response Body:

`{
  "message": 'User Created',
  "email": "example@example.com",
  "id": "exampleuserid"
}`


2. Login
<br>

`-` Logs in a user with an email and password and returns a JWT token for authorization.

> Endpoint: POST `/api/user/login-account`
Request Body:

`{
  "email": "example@example.com",
  "password": "examplepassword"
}`


> Response Body:

`{
  "message": 'Login Successfull, here is your token',
  "token": "examplejwt"
}`


## Booking Endpoints
<br>

1. Create a Booking

Creates a new booking for a hotel, flight, or car with the given details.

* Endpoint: POST `/api/booking/create-booking`

> Authorization Header: x-access-token: examplejwt

Request Body:

`{
  "type": "hotel",
  "startDate": "2023-05-01",
  "endDate": "2023-05-05",
  "details": {
    "hotelName": "Example Hotel",
    "roomType": "Single"
  }
}`


> Response Body:

`{
  "message": 'booking created Succesfully ',
  "type": "hotel",
  "userId": "exampleuserid",
  "startDate": "2023-05-01T00:00:00.000Z",
  "endDate": "2023-05-05T00:00:00.000Z",
  "details": {
    "hotelName": "Example Hotel",
    "roomType": "Single"
  },
  "createdAt": "2023-04-22T00:00:00.000Z",
  "_id": "examplebookingid",
  "__v": 0,
}
`

2.  Get All Bookings
<br>

Returns all bookings made by the currently authenticated user.

* Endpoint: GET `/api/booking/all-bookings`
<br>

> Authorization Header: x-access-token: examplejwt
Response Body:

`[ 

  `{    
      "type": "hotel",    
      "userId": "exampleuserid",    
      "startDate": "2023-05-01T00:00:00.000Z",   
      "endDate": "2023-05-05T00:00:00.000Z",    
      "details": {      
          "hotelName": "Example Hotel",      
          "roomType": "Single"    
      },    
      "createdAt": "2023-04-22T00:00:00.000Z",    
      "_id": "examplebookingid1",    "v": 0  
  }`


  `{   
      "type": "flight",    
      "userId": "exampleuserid",    
      "startDate": "2023-06-01T00:00:00.000Z",    
      "endDate": "2023-06-05T00:00:00.000Z",    
      "details": {      
          "airline": "Example Airline",      
          "flightNumber": "123"    
      },    
      "createdAt": "2023-04-22T00:00:00.000Z",    
      "_id": "examplebookingid2",    "v": 0  
  }`

]`

3. Single Booking
<br>

Get Booking by ID
Returns a single booking by its ID.

* Endpoint: GET `/api/booking/booking/:id`

<p>

`-` URL Params:
<br>

id - The ID of the booking to retrieve (string, required)
Headers:

x-access-token - A valid JWT token to authenticate the request (string, required)

Success Response:

Code: 200 OK
Content:
</p>

`{
  " message": 'Booking with given ID bellow',
  "_id": "614cf66f28934893c15e62d8",
  "type": "hotel",
  "userId": "614cf2f028934893c15e62d6",
  "startDate": "2023-05-15T00:00:00.000Z",
  "endDate": "2023-05-20T00:00:00.000Z",
  "details": {
    "hotelName": "Example Hotel",
    "roomType": "Deluxe Double",
    "numGuests": 2,
    "numRooms": 1
  },
  "createdAt": "2021-10-04T14:25:59.283Z",
  "__v": 0
}`


* Error Responses:
<br>

> Code: 401 Unauthorized
Content:

`{
  "error": "Token not provided"
}`


> Code: 401 Unauthorized
Content:

`{
  "error": "Invalid token"
}`


> Code: 404 Not Found
Content:

`{
  "error": "Booking not found"
}`


> Code: 500 Internal Server Error
Content:

`{
  "error": "Internal Server Error"
}`


4. Update Booking by ID

> Updates a single booking by its ID.

* Endpoint: Method: PUT `/api/booking/update-booking/:id`

URL Params:

id - The ID of the booking to update (string, required)
Headers:

x-access-token - A valid JWT token to authenticate the request (string, required)
<br>

> Data Params:

`type - The type of the booking (string, required)`
`startDate - The start date of the booking in ISO format (string, required)`
`endDate - The end date of the booking in ISO format (string, required)`
`details - Additional booking details specific to the booking type (object, required)`
<br>

> Success Response:

Code: 200 OK
Content:

`{
  "message": 'Booking Updated Successfully With Given ID',
  "_id": "614cf66f28934893c15e62d8",
  "type": "hotel",
  "userId": "614cf2f028934893c15e62d6",
  "startDate": "2023-05-15T00:00:00.000Z",
  "endDate": "2023-05-20T00:00:00.000Z",
  "details": {
    "hotelName": "Updated Hotel",
    "roomType": "Deluxe Double",
    "numGuests": 2,
    "numRooms": 1
  },
  "createdAt": "2021-10-04T14:25:59.283Z",
  "__v": 0
}`


* Error Responses:

`Code: 401 Unauthorized`
`Content: { error: 'Token not provided' }`
`Code: 401 Unauthorized`
`Content: { error: 'Invalid token' }`
`Code: 404 Not Found`
`Content: ''`


5. Delete a Booking

To delete a booking, send a DELETE request to the endpoint /bookings/:id, where :id is the ID of the booking you want to delete.

* Endpoint: Method: DELETE   `/api/booking/delete-booking/:id`


Headers:

x-access-token: The token obtained during authentication.

Example:

DELETE `/api/booking/delete-booking/614a153f3ce71b1e9c312cfd`

Response:

`200 OK if the booking was successfully deleted.`
`401 Unauthorized if the token is not provided or is invalid.`
`404 Not Found if the booking with the given ID does not exist or belongs to another user.`

> Example success response:

`{
  "message": 'Booking Deleted Successfully With Given ID',
  "_id": "614a153f3ce71b1e9c312cfd",
  "type": "hotel",
  "userId": "614a13b23ce71b1e9c312cfb",
  "startDate": "2023-05-01T00:00:00.000Z",
  "endDate": "2023-05-05T00:00:00.000Z",
  "details": {
    "hotelName": "Hilton",
    "numRooms": 2
  },
  "createdAt": "2021-09-21T17:11:19.689Z",
  "__v": 0
}`

<br>

> Example error response:

`{"error": "Invalid token"}`
