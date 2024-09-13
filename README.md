# Exertra

## Table of Contents

- [Exertra](#exertra)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Technologies and Packages Used](#technologies-and-packages-used)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Link to Deployed Application](#link-to-deployed-application)
    - [Screenshots of the Application](#screenshots-of-the-application)
  - [Credits](#credits)
  - [License](#license)

## Description

This is a full stack MERN application which can keep track of a user's workouts outdoors. This uses GraphQL API built with the Apollo Server to allow users and their workouts to be saved on the back end. It uses [Express.js](https://expressjs.com/) for handling the server, the [Mongoose](https://mongoosejs.com/) for interaction with [MongoDB](https://www.mongodb.com/docs/atlas/), [Apollo Client](https://www.apollographql.com/docs/react/) to manage data in [GraphQL](https://graphql.org/), and [React.js](https://react.dev/) to build the application on the front end. The [Node language manager](https://expressjs.com/) uses those packages to build and run the application.

This project is deployed to [Render Dashboard](https://dashboard.render.com/) as an app which can be used in the browser.

## Technologies and Packages Used

- [Node.js](https://nodejs.org/en)
- [Express.js](https://expressjs.com/)
- [React.js](https://react.dev/)
- [MongoDB](https://www.mongodb.com/docs/atlas/)
- [Mongoose](https://mongoosejs.com/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [GraphQL](https://graphql.org/)
- [Leaflet](https://leafletjs.com/reference.html)
- [Concurrently](https://www.npmjs.com/package/concurrently)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [JWT](https://jwt.io/introduction)
- [Tailwind CSS](https://tailwindcss.com/docs/guides/create-react-app)
- [Flowbite](https://flowbite.com/docs/getting-started/react/)
- [Render Dashboard](https://dashboard.render.com/)
  
## Installation

This is a full functioning application deployed at [this link](https://exertra.onrender.com/).

Alternatively, a user can clone the repository to view it on their local machine. Run `npm install` to install the necessary dependencies for the page to work. Initialize the application by using `npm run develop` to run both server and client side directories locally.

## Usage

One startup the app will open up with a login form. There a user can enter their login details or click on the button to take them to the sign form. Either way, once a user has logged in they will be taken to the home page of the app with a map that displays a user's position once permissions have been granted.

To begin an exercise click on the "Start" button. The stopwatch in the lower middle of the will begin displaying the user's total time and distance of the route. The map will draw a line representing the user's path taken. A user can "Pause" the workout then resume it again. Once the workout is complete hit the "Stop" button. Then the stopwatch will also stop and the data is stored in the user's workouts. To begin a new workout click the "Reset" button to clear the values in the stopwatch and map.

On the right is a button which will open a sidebar navigation tool. There a user can find several tabs including information about the app, Help, and the GitHub of the app. At the top of the menu there is a theme switcher component to change the theme of the app to dark mode or vice-verse. Clicking Logout will log the user out.

Clicking the Dashboard tab in the sidebar navigation will take the user to their dashboard page which will display the user's past workouts.

### Link to Deployed Application

Follow [this link](https://exertra.onrender.com/) to visit this application's page.

### Screenshots of the Application

![Navigation](/client/assets/images/exertra-screenshot1.jpg)
![Dashboard](/client/assets/images/exertra-screenshot2.jpg)
![Live Field Use](/client/assets/images/live-app-function.jpg)

## Credits

Referenced for idea on how to get started and for the inspiration for the functions to get distance from coordinates

_Make a running tracker with Geolocation API_. (2021, June 1). Stack Overflow. Retrieved September 4, 2024, from https://medium.com/geekculture/make-a-running-tracker-with-geolocation-api-8b2ac541196e
  
## License

This project is licensed under [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Please see the [License](https://opensource.org/licenses/MIT) page for more info.
