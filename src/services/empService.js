import httpCommon from "../commons/http-common";

const getEmployees = () =>{
    return httpCommon.get('/employee/employees');
}

export default {getEmployees};