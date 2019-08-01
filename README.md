# Wunderlist-API

API for a todo list on steroids

https://wunderlist-api.herokuapp.com


## Used Dependencies

- Bcrypt
- Cors
- Dotenv
- Express
- Helmet
- Jsonwebtoken
- Knex
- SQLite3
- Cross-Env (Development)
- Jest (Development)
- Nodemon (Development)
- Supertest (Development)


## Getting Started

Install dependencies
```
npm i
```
Run the server
```
npm run server
```
Run tests
```
npm run test
```
Run database migrations
```
npx knex migrate:latest
```
Run database seeds
```
npx knex seed:run
```


## Restrictions

To be able to access users route, you'll need to include valid JSON Web Token in your request Authorization header.
To be able to acess todos route, you'll need to include valid JWT as well as userID in your request UserID header.
Both the token and the id are aquired by registering an account or logging in.


# Endpoints

## Register and Login

**POST** /api/auth/register <br>
will create a new user responding with token and userID. Required fields are username (string) and password (string).


**POST** /api/auth/login  <br>
will log in existing user responding with token and userID. Required fields are username (string) and password (string).


## Users EPs

***(protected route, requires JWT in request headers)***


**GET** /api/users <br>
will return an array of all users.


**GET** /api/users/:id <br>
will return user with specified userID passed as request parameter.


**DELETE** /api/users/:id <br>
will delete user with specified userID passed as request parameter.


**PUT** /api/users/:id <br>
will update user with specified userID passed as request parameter. Required fields are username (string) and password (string). Returns newly updated user.


## Todos EPs

***(protected route, requires both JWT and userID in request headers)***


**GET** /api/todos  <br>
will return an array of all todos for given user.


**POST** /api/todos  <br>
will add a new todo for given user. Required fields are caption (string), description (string) and due_date (array of numbers structured like this [year, month, day, hour]). The value of completed and deleted fields will be automatically set to 0 (=false). Returns newly added todo.


**GET** /api/todos/:id <br>
will return todo with specified id passed as request parameter. If the todo doesn't belong to the user with provided userID, it'll respond with message: 'You are not allowed to see this todo, as it belongs to someone else...'.


**DELETE** /api/todos/:id <br>
will delete todo with specified id passed as request parameter. If the todo doesn't belong to the user with provided userID, it'll respond with message: 'You are not allowed to delete this todo, as it belongs to someone else...'.


**PUT** /api/todos/:id <br>
will update todo with specified id passed as request parameter. If the todo doesn't belong to the user with provided userID, it'll respond with message: 'You are not allowed to update this todo, as it belongs to someone else...'. Required fields are caption (string), description (string) and due_date ([year, month, day, hour]). Other fields are completed (0 or 1) and deleted (0 or 1). Returns newly updated todo.


**GET** /api/todos/deleted <br>
will return an array of all deleted todos for given user.


**GET** /api/todos/completed <br>
will return an array of all completed todos for given user.