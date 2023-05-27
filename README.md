# API Server 
 
## Description 
This is an API server built using Node.js and Express. It serves as the backend for our application and provides endpoints for client-side requests. 

## API Endpoints

### POST /api/users/signup 
Registers a new user with the given name and password. The method hashes the password and generates a jwt. 

### POST /api/users/login 
Logs in a user with the given name and password using jwt.

### GET /api/records/
Retrieves a paginated list of records from the database.

### POST /api/records/add 
Adds a new record to the database with the given information.

### POST /api/records/edit/:id 
Updates the record with the given ID in the database with the provided information.

### POST /api/records/delete/:id 
Deletes the record with the given ID from the database.

# Frontend 

## Description 
This is a frontend built using React. It communicates with the API server to display and manipulate data.