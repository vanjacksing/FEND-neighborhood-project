const exploreAPI = 'https://api.foursquare.com/v2/venues/explore'
const CLIENT_ID = 'KE0ASLEN4UG4NZJ4JXZUEC4S1JRT3WHZCF55CU1AU0YGOCQ5'
const CLIENT_SECRET = '4HECRDXCZWQBOULKY3CYFVYTNJHIFKR4DN5HS1G0KOCHQJTU'
const NEAR = 'Moscow'
const VERSION = '20180730'
const EXPLORE_REQUEST_URL = `${exploreAPI}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&near=${NEAR}&v=${VERSION}`

const requestHeaders = new Headers()
requestHeaders.append("Accept-Language", "en")


//TODO: remove working with css styles from here
// Fetching list of venues with Foursquare API
// At the moment this is just simple list of 30 most popular places in Moscow
export const getVenues = () => 
    fetch(EXPLORE_REQUEST_URL, {headers: requestHeaders})
        .then(function(res) {
            if (res.ok) {
                return res.json()
            }
            // Throw an error if response wasn't successfull
            throw new Error("Network response was not OK")
        })
        .then(data => data.response.groups[0].items)
        .catch(function(error) {
            // If an error occured, then show a toast with error message for 3 seconds and return empty list
            const errorMessageToast = document.querySelector(".network-error-message")
            errorMessageToast.style.display = "block";
            setTimeout(() => {
                document.querySelector(".network-error-message").style.display = "none";
            }, 3000);
            return [];
        })
// This is not used for now
export const getVenueImage = (id) => {
    const imageAPI = `https://api.foursquare.com/v2/venues/${id}/photos`
    const IMAGE_REQUEST_URL = `${imageAPI}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION}`
    const imageURL = fetch(IMAGE_REQUEST_URL, {headers: requestHeaders})
        .then((res) => {res.json()})
        .then((data) => {
            console.log(data)
            const suffix = data.response.photos.items[0].suffix
            const prefix = data.response.photos.items[0].prefix
            return `${prefix}original${suffix}`
        })
    return imageURL
}