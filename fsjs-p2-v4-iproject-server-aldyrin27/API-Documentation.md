# Si Paling Movie API Documentation

## Endpoints :

List of available endpoints:

- `POST /login`
- `POST /register`
- `POST /google`
- `GET /movies`
- `GET /movies/:id`
- `POST /generate-midtrans`
- `POST /booking`
- `GET /booking`
- `PATCH /booking`

&nbsp;

## 1. POST /register

Description:
- Post register to website

Request:

- body:

```json
{
  "email": "string",
  "password": "string",
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email" : "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email and Password cannot be null"
}
```

&nbsp;

## 2. POST /login

Description:
- post login to website

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email and Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email or password"
}
```

&nbsp;

## 3. POST /google/login

Description:
- Post google login

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

&nbsp;

## 4. GET /movies

Description:
- GET Movies to database

Request:


_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "title": "string",
    "image": "string",
    "releaseYear": "integer",
  }
  ...,
]
```


&nbsp;

## 5. GET /movies/:id

Description:
- GET Movies/:id to database

Request:

- params:

```json
{
  "id": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "title": "string",
    "image": "string",
    "releaseYear": "integer",
  }
  ...,
]
```


&nbsp;

## 6. POST /generateMidtrans

Description:
- Get Token Midtrans from database

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
    "token": "string",
  }
]

_Response (400 - Bad Request)_

```json
{
  "message": "Already Paid"
}
```

&nbsp;

## 7. POST /booking

Description:
- Post booking to website

Request:

- body:

```json
{
  "title": "string",
  "cinema": "string",
  "seat": "string",
  "date": "string",
  "price": "integer"
}
```

_Response (201 - Created)_

```json
{
  "title": "string",
  "cinema": "string",
  "seat": "string",
  "date": "string",
  "price": "integer"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "title/cinema/seat/date is required"
}
```

&nbsp;

## 8. GET /booking

Description:
- GET booking to website

Request:

- body:

```json
{
  "title": "string",
  "cinema": "string",
  "seat": "string",
  "date": "string",
  "price": "integer",
  "status": "string"
}
```

&nbsp;

## 9. PATCH /booking

Description:
- PATCH booking to website

Request:

- body:

```json
{
  "status": "string",
}
```

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
_Response (404 - Not Found)_

```json
{
  "message": "Movies not found"
}
```