import React, { Component } from 'react';
import './App.css';
import MapComponent from './MapComponent';
import VenueListComponent from './VenueListComponent';
import * as VenuesAPI from './VenuesAPI'
import Fuse from 'fuse.js'
import HamburgerIconComponent from './HamburgerIconComponent'

// This is used for working with 2GIS maps API
var DG = require('2gis-maps')

class App extends Component {

constructor(props) {
  super(props)
  this.state = {
    venues: [],  // List of venues (places of interes)
    clickedVenueId: null, // This is used for linking 2 components - venueList and mapComponent
    searchQuery: ""
  }
}

componentDidMount() {
  // Fetch list of venues and add it to the app state
  VenuesAPI.getVenues().then(venues => {
    const venuesWithMarkers = venues.map(venue => this.addMarkerToVenue(venue))
    this.setState({
      venues: venuesWithMarkers
    });
  });
}

// This is called from VenueListComponent so that we can track item that was clicked to pass this info to MapComponent
itemClickHandler = (id, e) => {
  this.setState({
    clickedVenueId: id
  })
  const itemList = document.getElementById("locations-container")
  // In case of mobile layout add special class to the venues list element so that it slides off the screen
  if (itemList.classList.contains("venue-list-translate")) {
    itemList.classList.toggle("venue-list-translate")
  }
} 

// Add a map marker entity to venue object
addMarkerToVenue = (venue) => {
  const venueName = venue.venue.name
  const marker = DG.marker([venue.venue.location.lat, venue.venue.location.lng])
  marker.bindPopup(venueName)
  venue.marker = marker
  return venue
}

// Update search query
updateQuery = query => {
  this.setState({
    searchQuery: query
  });
};

// Filter list of venues based on search query. This is base on fuse.js library 
// Fuse.js is a fuzzy search library that allows to find info even if user typed search query with typos
filterVenues = (query) => {
  const options = {
    keys: ["venue.name", "venue.categories.name"],
    threshold: 0.2,
    minMatchCharLength: 3,
    caseSensitive: false,
    distance: 1000
  }
  if (!query) {
    return this.state.venues;
  } else {
    const fuse = new Fuse(this.state.venues, options)
    const results = fuse.search(query)
    return results;
  }
}

render() {
  const venueList = this.filterVenues(this.state.searchQuery)
  return (
    <div className="app-wrapper">
      <main className="container">
        <section className="row" id="location-filter-container">
            <HamburgerIconComponent/>
            <input type="search" 
                   id="filter-textbox" 
                   placeholder="Search text"
                   className="col-sm"
                   onChange = {
                   event => {
                     this.updateQuery(event.target.value);
                     }
                  }/>
        </section> 
        <section className="row" id="content-wrapper">
          <VenueListComponent venueList={venueList} updateQuery={this.updateQuery} onItemClick={this.itemClickHandler}/>
          <MapComponent venueList={venueList} clickedVenueId={this.state.clickedVenueId}/>
        </section>
      <span className="toast network-error-message"> Can 't load data, try refreshing the page!</span>
      </main>
      <footer className="row"><span className="powered-by" tabIndex={0}>Powered by <a href="https://foursquare.com"> Foursquare</a></span></footer>
    </div>)
  }
}

export default App;
