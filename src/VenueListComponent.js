import React, {Component} from 'react'

class VenueListComponent extends Component {

    render() {
        return (<div className="col-sm-4" id="locations-container" >
                <div className="row" id="location-filter-container">
                    <input 
                        type="search" 
                        id="filter-textbox" 
                        placeholder="Search text"
                        onChange = {
                            event => {
                                this.props.updateQuery(event.target.value);
                            }
                        }/>
                </div> 
                <div className="row" id="location-list-container">
                    <ul id="location-list">
                    {this.props.venueList.map(item => (
                        <li key={item.venue.id}
                            onClick={(e) => this.props.onItemClick(item.venue.id, e)}>
                        <span className="category-badge">{item.venue.categories[0].name}</span> 
                        <p>{item.venue.name}</p>
                        </li>
                    ))}
                    </ul> 
                </div> 
            </div>)
    }
}

export default VenueListComponent