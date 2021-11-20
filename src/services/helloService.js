import httpCommon from "../commons/http-common";

const getHello = () =>{
    return httpCommon.get('/hello');
}

export default {getHello};