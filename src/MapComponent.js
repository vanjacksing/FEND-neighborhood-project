import React, {Component} from 'react'

var DG = require('2gis-maps')

class MapComponent extends Component {
    
    state = {
        neighborhoodMap: null
    }

    componentDidMount() {
        this.setState({
            neighborhoodMap: DG.map('map', {
                center: [55.75, 37.62],
                zoom: 11,
                minZoom: 10,
                currentLang: 'en'
            })
        }) 
    }

    componentDidUpdate(prevProps, prevState) {
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
            <div id="map" className="col-sm map-container">
            </div>
        )
    }
}

export default MapComponent