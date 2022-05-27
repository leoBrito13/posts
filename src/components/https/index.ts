import axios from "axios";

const https = axios.create({
    //baseURL: `https://${window.location.hostname}/wp-json/wp/v2/`
    baseURL: `https://jbaimoveis.com.br/wp-json/wp/v2/`
})

export default https