import httpCommon from "../commons/http-common";
//services to be reused. its like concatenating the base url in http-common to the urls here to access the methods in the API
const getEmployees = () =>{
    return httpCommon.get('/employee/employees');
}
const postEmployee = (data) =>{
    return httpCommon.post('/employee/employees',data);
}
const getEmployee = (id) =>{
    return httpCommon.get(`/employee/employees/${id}`);
}
const putEmployee = (data) =>{
    return httpCommon.post('/employee/employees',data);
}
const deleteEmployee = (id) =>{
    return httpCommon.delete(`/employee/employees/${id}`)
}

export default {getEmployees,postEmployee,putEmployee,getEmployee,deleteEmployee};