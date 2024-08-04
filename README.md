# Next.js Setup and API Documentation
=====================================

## Installation and Running
---------------

To install and run the Next.js application, use the following commands:

npm install
npm run dev
npm run build
npm start

## API Endpoints
-------------

### Login API

To test the login API, use the following cURL command:

curl --location 'http://localhost:3000/api/login' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "grdp99@gmail.com",
  "password": "Hello@111"
}'

### Register API

To test the register API, use the following cURL command:

curl --location 'http://localhost:3000/api/register' \
--header 'Content-Type: application/json' \
--data-raw '{
       "name": "your name",
       "email": "dummy@gmail.com",
       "password": "1234567890",
       "role": "sm"
     }'