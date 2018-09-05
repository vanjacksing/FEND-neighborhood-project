import React, {Component} from 'react'

export default class HamburgerIconComponent extends Component {

    handleClick() {
        document.getElementById("locations-container").classList.toggle("venue-list-translate")
    }

    render() {
        return (
            < div className = "hamburger-container"
                onClick = {(e) => this.handleClick(e)}
                aria-label="Hamburger menu"
                role="button">
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
            </div>
        )
    }
}