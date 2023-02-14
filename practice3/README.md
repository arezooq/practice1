### Introduction
Project an exercise to learn myself about the subject of api. Working with four methods get, post, put, delete as well as postman
The project has the ability to create a database and save the desired book information. Also, the operation of updating, displaying, deleting the information entered in this project is done.
### Installation Guide
* Clone this repository [here](https://github.com/arezooq/practicesNode/tree/main/practice3).
* The develop branch is the most stable branch at any given time, ensure you're working from it.
* Run npm install to install all dependencies
* You can either work your locally installed mysql. Do configure to your choice in the application entry file.
### Usage
* Run npm start to start the application.
* Connect to the API using Postman on port 5000.
### API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /api/books/addBook | Add a new book |
| GET | /api/books/allBooks | See all books added to the database |
| GET | /api/books/:id | See single book by id|
| PUT | /api/books/:id | To edit the details of a single book |
| DELETE | /api/books/:id | To delete a single book |
### Technologies Used
* [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
* [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
### Authors
* [Arezoo Ghorbanzade](https://github.com/arezooq)

