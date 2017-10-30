import SpotifyApi from 'spotify-web-api-js'
import Cookies from 'js-cookie'
import { client_id, callback_url, auth_url } from 'config/spotify'

let access_token = Cookies.get('access_token')

if (!window.location.hash && typeof access_token === 'undefined') {
    const api_url = `${auth_url}?client_id=${client_id}&response_type=token&redirect_uri=${callback_url}`

    window.location.replace(api_url)
}

if (window.location.hash) {
    const response = JSON.parse(`{"${window.location.hash.slice(1).replace(/&/g, '", "').replace(/=/g, '" : "')}"}`)
    const expires = new Date(Date.now() + (parseInt(response.expires_in) * 1000))

    access_token = response.access_token

    Cookies.set('access_token', access_token, {
        expires
    })

    window.history.replaceState({}, document.title, '/')
}

const spotifyApi = new SpotifyApi()

spotifyApi.setAccessToken(access_token)

export default spotifyApi
