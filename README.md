# Airbnb Booking Module

> This is a front end capstone project to build a clone of an Airbnb listing booking module.

## Related Projects

  - https://github.com/hrr47-fec8-webber/carousel-service
  - https://github.com/hrr47-fec8-webber/reviews-service
  - https://github.com/hrr47-fec8-webber/moreplacestostay-service

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)

## Usage

> Using this booking module you can go do multiple id endpoints explained down below and see conditional rendered components as well as some react bootstrap modal user interaction.

### API
- Get full information of a listing
  - Method & Path

      `GET /api/booking/:id`

  - Example Response
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

      `POST /api/booking/:id`

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

  - Example Response
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

  - Example Response
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

  - Example Response
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

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

### Dependencies
- Node 6.13.0
- axios 0.19.2
- bootstrap 4.5.2
- express 4.17.1
- faker 4.1.0
- mariadb 2.4.2
- path 0.12.7
- prop-types 5.7.2
- react 16.13.1
- react-axios 2.0.3
- react-bootstrap 1.3.0
- react-dom 16.13.1
- styled-components 5.1.1

### Dev Dependencies
- @babel/core 7.11.1
- @babel/preset-env 7.11.0
- @babel/preset-react 7.10.4
- babel-jest 26.3.0
- babel-loader 8.1.0
- chai 4.2.0
- enzyme 3.11.0
- enzyme-adapter-react-16 1.15.3
- enzyme-to-json 3.5.0
- eslint 7.2.0
- eslint-config-airbnb 18.2.0
- eslint-plugin-import 2.22.0
- eslint-plugin-jsx-a11y 6.3.1
- eslint-plugin-react 7.20.5
- eslint-plugin-react-hooks 4.0.0
- jest 26.3.0
- nodemon 2.0.4
- sinon 9.0.3
- webpack 4.44.1
- webpack-cli 3.3.12

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```
This will install all necessary dependencies.

### Getting Started

The first and foremost task is to get mariadb downloaded, up and running.  After that, you should create a file named ```login.js``` and place within the database folder with the necessary mariadb login information (e.g. user, password, host, and default database) in an object format.

Next step is to run the seeding script ```npm run seed```. This will seed the database with mock data that can be viewed by going to endpoints of id 1-100 (explained later.)

The next step is to use two terminals to start the webpack build watching and the server
```
npm run build:dev
npm run start:dev
```
Following that, you can open up a browser and go to http://localhost:3002/(:id) where (:id) represents an id referencing a mock listing from our database.  You may use the numbers 1-100 for the id value.

### Testing

Finally, to test our program we can run the following tests after code changes.
```npm run test```

Note that the testing is very minimal at this point and is not extensive by any means.
