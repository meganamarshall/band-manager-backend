# Band Manager API

REST API hosted on AWS. Using MongoDB, Mongoose, and Express.  
  
Using zipcodeapi.com for getting city and state by zip code.

## routes:
GET all tours  
POST a tour  
POST a show on a tour  
PUT update attendance for a show  
DELETE a show  
DELETE a tour


## environment variables:  
API_KEY  
MONGODB_URI  
PORT

## scripts:
"lint": "eslint .",  
    "pretest": "npm run lint",  
    "jest": "jest --runInBand",  
    "test": "npm run jest",  
    "test:coverage": "npm run test -- --coverage",  
    "test:watch": "npm run jest -- --watchAll",  
    "test:verbose": "npm run test -- --verbose",  
    "start": "node server.js",  
    "start:watch": "nodemon server.js"  



