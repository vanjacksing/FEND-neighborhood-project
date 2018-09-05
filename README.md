# Neighborhood map project

This is the final project of Udacity Frontend Developer nanodegree. This app is built with Reactusing Foursquare API as data source and 2GIS API for the maps part.

## What it does

This is a simple app that fetches list of places of interest in Moscow using Foursquare API for getting popular places, and displays it on a map and in a list view. It allows to filter list of displayed locations using a search string on top of the page. The search is fuzzy - this means that the app may not be looking for exact match, but for something similar to what user typed in, allowing to find information even if user has made a typo. Search is performed using both location name and category. Anyway, search parameters can be adjusted in code. When user types text to the search field, list of locations and displayed markers on map are updated accordingly. Clicking on an item in the list centers map on corresponding location and opens popup with specific to location info.

## Responsiveness

The app is responsive on the screens of different sizes. It has 2 layouts: desktop for screens wider than 768px and mobile for others. Mobile layout has collapsible Locations list view, which can be hidden with hamburger menu icon in top left corner of a page.

## Accessibility

The app has basic accessibility features, such as focus management, semantic html elements, ARIA labels, etc.

## What it uses

* [React](https://reactjs.org/)
* [Foursquare API](https://developer.foursquare.com/) for getting locations info
* [2GIS API](http://api.2gis.ru/doc/maps/en/quickstart/) as maps API
* [Fuse.js](http://fusejs.io/) for performing object search
* [mini.css](https://minicss.org/) as a simple CSS framework for creating responsive layout and styling some basic elements
* [create-react-app](https://github.com/facebook/create-react-app) for creating some boilerplate react code
* [npm](https://www.npmjs.com/) as package manager
* Service worker for caching static data

## How to launch dev server

```bash
npm install
npm run start
```

Note that service worker will not work with dev server (service worker functionality was provided by create-react-app tool). In order to see service worker in action you should build prod version of the app and serve it with static server

```bash
npm run build
npm install -g serve
serve -s build
```