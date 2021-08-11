# Brewhub-API

A REST API which provides access to Canadian breweries information. If you don't see your brewery listed, please submit an issue with the following information:

    name: Name of your brewery
    type: Type(s) of brewery (Micro, Macro, Hobby, Corporate, etc)
    active: Is your brewery active?
    street_address: Your street address 
    province: Your province
    city: Your city
    postal_code: Your postal code
    country: Canada (for now)
    longitude: Can be grabbed from google maps
    latitude: Can be grabbed from google maps
    phone: Your contact phone number 
    website: Your brewery website
    description: Short description < 100 words.
    logo_url: Web hosted logo url
    established: Year you established the brewery
    social1: Twitter url
    social2: Instagram url
    social3: Facebook url

## Prerequisites:

 * Node.js ^10.16
 * PostgreSQL 12.7

## Tech Stack:

 * PostgreSQL
 * Node.js
 * Express.js
 * Sequelize

## Installation:

Clone the github repo:

`$ git clone [git repo url]`

Install dependencies:

`$ cd brewhub-api`

`$ npm install`

Configure Database:

`$ sudo -u postgres psql`

(in pqsl)

`=# CREATE DATABASE brewhub_development;`

Migrate and Seed the database:

`$ npx sequelize-cli db:migrate`

`$ npx sequelize-cli db:seed:all`

Copy and rename .env:

`$ cp .env.example .env`

Replace the placeholder text with your psql username, password, server, port and database name:

`DATABASE_URL=postgres://[userame]:[password]@[server]:[port]/[database]`

In most cases the string will just look like this unless you have created special users for your db:

`DATABASE_URL=postgres://postgres:postgres@localhost:5432/brewhub_development`

Run the server:

`$ npm start`

