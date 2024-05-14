# Easy Shop
Easy Shop is a simple e-commerce application developed to gather data about user irritation times caused by long server responses. It is built using TypeScript and React for the frontend, and Spring Boot for the backend.

## Introduction
Easy Shop aims to provide insights into user irritation times caused by delays in server responses. By monitoring user interactions and response times, developers can identify bottlenecks in the system and optimize the application for better performance.

## Features
- User-friendly interface for browsing and purchasing products.
- Monitoring of user irritation times on specific locations.
- Secure authentication and authorization mechanisms.
- RESTful API for seamless communication between the frontend and backend.

## Technologies Used
### Frontend:
- TypeScript 4.9.5
- React 18.2.74
- React Router 6.22.3
- Redux 9.1.0
- Axios 1.6.8
- Reactstrap (for styling) 9.2.2

### Backend:
 - Java 18.0.2.1
 - Spring Boot 3.2.4
 - Spring Data JPA (for database access) 
 - Spring Security (for authentication and authorization)
 - RESTful API

### Database:
 - PostgreSQL

## Getting Started
### Prerequisites
Before running Easy Shop locally, ensure you have the following installed on your machine:
 - npm (Node Package Manager)
 - JDK (Java Development Kit)
 - Maven (for building and running the backend)
   
### Installation
Clone the repository:

`git clone https://github.com/milo00/easy-shop.git`

Install frontend dependencies:

`cd easy-shop/frontend`

`npm install`

Install backend dependencies:

`cd ../backend`

`mvn install`

### Usage
Start the backend server:

`cd backend`

`mvn spring-boot:run`


Start the frontend development server:

`cd frontend`

`npm start`

Open your web browser and navigate to `http://localhost:3000` to access the Easy Shop application.
