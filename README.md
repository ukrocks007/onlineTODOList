# Online TODO List application

A simple online TODO list with a web interface that can be used in all popular web browsers. The application Supports multiple users and store data.

#### Features covered
- [x] Users can sign in securely using basic username and password authentication
- [x] Multiple users can log in at the same time
- [x] Users can view their tasks
- [x] Users can add/remove tasks
- [x] Tasks are stored in a database on the server side
- [x] Use Docker containers
- [x] Unit test coverage

## Brief description

This web application is used to manage Todo lists of multiple users. User can signup and login using email address and password. User can create multiple Todo lists containing multiple tasks. User can check and uncheck the tasks. By using update button the lists are stored in database. User can perform CRUD operations on Todo lists and the tasks within the lists.

## Overview of the technologies/architecture

The application has three parts.
1. Frontend
   - React application using tabler-react
2. Backend
   - Node REST API using express
3. Database
   - MongoDB

Frontend and backend are two independant application. Backend is dependent on mongodb.

Frontend uses tabler-react as UI framework & supports all popular web browsers. Frontend is mobile responsive and supports all screen resolutions.

## Security considerations

Backend saves passwords in encrypted format in database. Also uses JWT for login. So unauthorized access to the APIs are prevented. While using in production make sure to change the JWT secret from backend config file located in configs folder.

## How to build and deploy the application

1. Without docker

```
git clone https://github.com/ukrocks007/onlineTODOList.git
cd onlineTODOList/frontend && npm i
cd ../backend && npm i
```

Make sure that mongodb is running in localhost or if using cloud hosted mongo change the URL in the backend config file in configs folder.

To run application:

In first terminal start backend

```
npm run start
```

In second termainal start frontend

```
cd ../frontend
npm run start
```

You can also build the frontend using

```
npm run build
```

This will build optimised frontend and save it in build directory in frontend.

You can use SimpleHTTPServer of python or httpd of ruby to host the build folder.

```
cd build
python -m SimpleHTTPServer 3000
or
ruby -run -e httpd . -p 3000
```

Once both backend and frontend is running you can access the app on

http://localhost:3000

2. Using Docker

In order to connect to mongodb running in docker make sure local mongodb is stopped and change localhost to mongo in the mongo url in config file located in configs folder of backend. Here mongo is the name of mongodb service.

In the root directory of the project run following command

```
docker-compose up --build
```

This will spin up 3 containers for Frontend, Backend & Mongo.

It may take some time to start as images has to be downloaded from dockerhub and building may also take time.
Once you are able to see the frontend logs on the terminal you can access the app on

http://localhost:3000

## Login details for testing purposes

As Sign-up feature in implemented you can create you own users and test the app.

In the backend to test API you can run

```
npm run test
```

## Extra features which can be implemented

- [ ] Showing time & date when the task was added
- [ ] Sharing the list between different users
- [ ] Use metamask login
- [ ] Saving data on blockchain instead of db
- [ ] Adding attachments to tasks like pdf, images etc
