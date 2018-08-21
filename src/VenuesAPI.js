const api = 'https://api.foursquare.com/v2/venues/explore'
const CLIENT_ID = 'KE0ASLEN4UG4NZJ4JXZUEC4S1JRT3WHZCF55CU1AU0YGOCQ5'
const CLIENT_SECRET = '4HECRDXCZWQBOULKY3CYFVYTNJHIFKR4DN5HS1G0KOCHQJTU'
const NEAR = 'Moscow'
const SECTION = 'topPicks'
const VERSION = '20180730'
const REQUEST_URL = `${api}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&near=${NEAR}&v=${VERSION}`

const requestHeaders = new Headers()
requestHeaders.append("Accept-Language", "en")

export const getVenues = () => 
    fetch(REQUEST_URL, {headers: requestHeaders})
        .then(res => res.json())
        .then(data => data.response.groups[0].items)