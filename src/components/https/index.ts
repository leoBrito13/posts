import axios from "axios";

const https = axios.create({
    baseURL: 'https://jbaimoveis.com.br//wp-json/wp/v2/'
})

export default https