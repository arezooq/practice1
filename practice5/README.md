# Middleware

## Introduction

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

An Express application can use the following types of middleware:

* Application-level middleware
* Router-level middleware
* Error-handling middleware
* Built-in middleware
* Third-party middleware

The following middlewares are used in this exercise:

### Built-in middleware

#### express.urlencoded([options]):

This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
#### express.json([options]):

This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
#### morgan(format, options):

Create a new morgan logger middleware function using the given format and options. 

### Error-handling middleware

Error-handling middleware always takes four arguments. You must provide four arguments to identify it as an error-handling middleware function. Even if you don’t need to use the next object, you must specify it to maintain the signature. Otherwise, the next object will be interpreted as regular middleware and will fail to handle errors.

### Third-party middleware

####  body-parser Middleware

The body-parser middleware parses all incoming requests body content and adds the information inside the req.body before triggering any handlers. This will be useful especially when working with PUT and/or POST requests.

#### cors Middleware

There is a high chance your API needs to be accessible from different client origins, for example, from a mobile device, or from a web browser while your API is running in a different server. 

## Installation

* npm i -D @types/cors @types/body-parser @types/morgan for Typescript

## Usage

In the main file (app.ts), import the required middleware after installation and use it as follows:

* app.use(morgan('tiny'))
* app.use(express.json())
* app.use(bodyParser.json())
* app.use(bodyParser.urlencoded({ extended: true }));
* app.use(errorMiddleware)
