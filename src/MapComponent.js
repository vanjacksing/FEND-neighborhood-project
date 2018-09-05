import React, {Component} from 'react'

var DG = require('2gis-maps')

class MapComponent extends Component {
    
    state = {
        neighborhoodMap: null // This is a reference to map object
    }

    componentDidMount() {
        // Initializing map here and adding event listener for removing everything that's inside map from tabindex
        const map = DG.map('map', {
            center: [55.75, 37.62],
            zoom: 11,
            minZoom: 10,
            currentLang: 'en'
        }).on('layeradd', function (e) {
            document.querySelectorAll('#map [tabindex="0"], #map a, #map').forEach(function (item) {
                item.setAttribute('tabindex', '-1');
            })
        })
        this.setState({
            neighborhoodMap: map,
        })
    }

    componentDidUpdate(prevProps) {
        // Update list of visible markers on the map when search query was changed
        if (prevProps.venueList !== this.props.venueList)  {
            this.hideMarkers(prevProps.venueList)
            this.showMarkers(this.props.venueList)
        }
        if (prevProps.clickedVenueId !== this.props.clickedVenueId) {
            this.showPopup(this.props.venueList)
            this.centerMap(this.props.venueList)
        }
    }

    showMarkers = (venues) => {
        venues.forEach(item => {
            item.marker.addTo(this.state.neighborhoodMap)
        })
    }

    showPopup = (venues) => {
        venues.forEach(item => {
            if (item.venue.id === this.props.clickedVenueId) {
                item.marker.openPopup()
            }
        })
    }

    hideMarkers = (venues) => {
        venues.forEach(item => {
            item.marker.remove()
        })
    }

    centerMap = (venues) => {
        const centerLatLng = venues.filter(venue => venue.venue.id === this.props.clickedVenueId)[0].marker.getLatLng()
        this.state.neighborhoodMap.setView(centerLatLng, 13)
    }

    render() {
        return (
            <section id="map" className="col-sm-12 col-md-8 map-container" tabIndex="-1">
            </section>
        )
    }
}

export default MapComponent