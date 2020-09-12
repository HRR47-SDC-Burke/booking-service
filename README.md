# Lairbnb / booking-service

[![CI Status](https://circleci.com/gh/HRR47-SDC-Burke/booking-service.svg?style=shield)](https://circleci.com/gh/HRR47-SDC-Burke/booking-service)

> Booking & Calendar Service for the listing page of a vacation rental website

## Related Projects

  - https://github.com/HRR47-SDC-Burke/carousel-service
  - https://github.com/HRR47-SDC-Burke/reviews-service

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
4. [Production](#production)
4. [Screenshot](#screenshot)

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

> Create a "booking_db" database via PSQL. Please see how to set up the
> [environment variables](#environment-variables) if your PostgreSQL requires
> authentication. Run the following command in terminal after the db is created.

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
npm run build:dev
```

```sh
npm run start:dev
```

### Testing

```sh
npm test
```

## Production

### Environment Variables
- If you do not have the environment variables set up via shell, you can create
 a `.env` file in the repository's root folder to load them. These are optional.

 ```sh
  POSTGRES_URL=<your-db-host>
  POSTGRES_PORT=<your-db-port>
  POSTGRES_DB=<your-database-name>
  POSTGRES_USER=<your-db-username>
  POSTGRES_PASSWORD=<your-db-password>
  PORT=<your-server-port>
  NEW_RELIC_LICENSE_KEY=<your-new-relic-license-key>
  CLOUD_BUNDLE_URL=<your-cloud-hosted-bundle-url>
 ```

 ### Webpack Production Build

```sh
npm run build
```

### Node Express Server

```sh
npm start
```

### Hosting The Bundle on Cloud
> Requires [Grunt](https://gruntjs.com/) and the dev dependencies to be installed

- Create the grunt-aws.json file at $HOME/.aws directory
  ```sh
  {
    "accessKeyId": "<your-access-keyId>",
    "secretAccessKey": "<your-access-secret>",
    "bucket": "<your-bucket-name>"
  }
  ```
- Add `CLOUD_BUNDLE_URL=<your-bucket-url>` to the environment variables

- Run $ `grunt` on the terminal

## Screenshot
![Screenshot](./docs/screenshot.png?raw=true "Screenshot")
