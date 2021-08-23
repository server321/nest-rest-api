# Nest Rest API

---

## APIs
Import `NestJS Collection.postman_collection.json` file to Postman to see all APIs.  

### Get All
GET "http://localhost:3000/employees"

### Get one
GET "http://localhost:3000/employees/:id"

### Delete
DELETE "http://localhost:3000/employees/:id"

### Upgate
PUT "http://localhost:3000/employees/:id"

### Create (including formdata file)
POST "http://localhost:3000/employees/:id"

### Get large profile image
GET "http://localhost:3000/employees/profile-image/:filename"

### Get small profile image
GET "http://localhost:3000/employees/profile-image-small/:filename"

---

### Validation
Validation of emails and empty fields.

---

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
