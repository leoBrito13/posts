import axios from "axios";

const https = axios.create({
    baseURL: 'https://premium.colibritemporario2.com.br//wp-json/wp/v2/'
})

export default https