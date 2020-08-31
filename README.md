# Airbnb Booking Module

> This is a front end capstone project to build a clone of an Airbnb listing booking module.

## Related Projects

  - https://github.com/HRR47-SDC-Burke/carousel-service
  - https://github.com/HRR47-SDC-Burke/reviews-service
  - https://github.com/HRR47-SDC-Burke/moreplacestostay-service

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)

## Usage

> Example URL: http://localhost:3002/25

### API
- Get full information of a listing
  - Method & Path

      `GET /api/booking/:id`

  - Sample Response
      ```sh
      {
        "listing": [
          {
            "id": 36,
            "ownerName": "Marcellus1",
            "rating": 4.42,
            "numRatings": 31,
            "pricePerNight": 159,
            "discountAmount": 0
          }
        ]
      }
      ```

- Add a new listing
  - Method & Path

      `POST /api/booking`

  - Request Body (All properties are **required**)
    ```sh
    {
      "ownerName": <String>,
      "rating": <Number>,
      "numRatings": <Integer>,
      "pricePerNight": <Integer>,
      "discountAmount": <Integer>
    }
    ```

  - Sample Response
    ```sh
    {
      "listing": [
        {
          "id": 36,
          "ownerName": "Marcellus2",
          "rating": 4.44,
          "numRatings": 32,
          "pricePerNight": 159,
          "discountAmount": 10
        }
      ]
    }
    ```

- Modify an existing listing
  - Method & Path

      `PUT /api/booking/:id`

  - Request Body (All properties are **optional**)
    ```sh
    {
      "ownerName": <String>,
      "rating": <Number>,
      "numRatings": <Integer>,
      "pricePerNight": <Integer>,
      "discountAmount": <Integer>
    }
    ```

  - Sample Response
    ```sh
    {
      "listing": [
        {
          "id": 36,
          "ownerName": "Marcellus2",
          "rating": 4.44,
          "numRatings": 32,
          "pricePerNight": 159,
          "discountAmount": 10
        }
      ]
    }
    ```

- Delete an existing listing
  - Method & Path

      `DELETE /api/booking/:id`

  - Sample Response
      ```sh
      {
        "listing": [
          {
            "id": 36,
            "ownerName": "Marcellus2",
            "rating": 4.44,
            "numRatings": 32,
            "pricePerNight": 159,
            "discountAmount": 10
          }
        ]
      }
      ```

## Requirements

- Node.js v12.18.1
  - https://nodejs.org/

- PostgreSQL v12.4
  - https://www.postgresql.org/

## Development

All commands from within the repository's root directory.

### Installing Dependencies

```sh
npm install
```

### Setting up Database

```sh
npm run db:setup
```

### Generating Listing Data for Database
- Creates a CSV file with 10 Million records. Please follow the prompts.
  ```sh
  npm run db:generate
  ```
- Creates a CSV file with custom amount of records. Please follow the prompts.
  ```sh
  npm run db:generate -- -n=<amount>
  ```
### Development Server

On two separate terminal windows:

```sh
npm run build:watch
```

```sh
npm run start:watch
```

### Testing

```sh
npm test
```
