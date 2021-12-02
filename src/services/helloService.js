import httpCommon from "../commons/http-common";

const getHello = () =>{
    return httpCommon.get('/greet/hello');
}

export default {getHello};