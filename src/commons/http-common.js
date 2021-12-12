import axios from "axios";

export default axios.create({//used to connect to api
    baseURL : 'http://localhost:8080/api/v1',
    headers : {
        'Content-Type': 'application/json'
    }
})