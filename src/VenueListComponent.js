import React, {Component} from 'react'

class VenueListComponent extends Component {

    render() {
        const nonEmptyList = this.props.venueList.length > 0
        const listContainerClassName = "row " + (!nonEmptyList ? "empty-list-vertical-centering" : "")
        return (<section className="col-md-4 col-sm-8" id="locations-container" >
                <div className={listContainerClassName} id="location-list-container">
                { nonEmptyList ?
                    (<ul id="location-list">
                    {this.props.venueList.map(item => (
                        <li key={item.venue.id}
                            tabIndex="0"
                            aria-label={item.venue.name}
                            onClick={(e) => this.props.onItemClick(item.venue.id, e)}>
                        <span className="category-badge">{item.venue.categories[0].name}</span> 
                        <p>{item.venue.name}</p>
                        </li>
                    ))}
                    </ul>) : (
                    <div className="empty-list-placeholder">
                        <i className="fas fa-exclamation-triangle"></i>
                        <p>Nothing to display here</p>
                    </div>
                    )
                } 
                </div> 
            </section>)
    }
}

export default VenueListComponent