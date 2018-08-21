import React, { Component } from 'react';
import './App.css';
import MapComponent from './MapComponent';
import VenueListComponent from './VenueListComponent';
import * as VenuesAPI from './VenuesAPI'
import Fuse from 'fuse.js'

var DG = require('2gis-maps')

class App extends Component {

constructor(props) {
  super(props)
  this.state = {
    venues: [],
    clickedVenueId: null,
    searchQuery: ""
  }
}

componentDidMount() {
  VenuesAPI.getVenues().then(venues => {
    const venuesWithMarkers = venues.map(venue => this.addMarkerToVenue(venue))
    this.setState({
      venues: venuesWithMarkers
    });
  });
}

itemClickHandler = (id, e) => {
  this.setState({
    clickedVenueId: id
  })
} 

addMarkerToVenue = (venue) => {
  const venueName = venue.venue.name
  const marker = DG.marker([venue.venue.location.lat, venue.venue.location.lng])
  marker.bindPopup(venueName)
  venue.marker = marker
  return venue
}

updateQuery = query => {
  this.setState({
    searchQuery: query
  });
};

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
      <div className="container">
        <div className="row">
          <VenueListComponent venueList={venueList} updateQuery={this.updateQuery} onItemClick={this.itemClickHandler}/>
          <MapComponent venueList={venueList} clickedVenueId={this.state.clickedVenueId}/>
        </div>
      </div>
    )
  }
}

export default App;
