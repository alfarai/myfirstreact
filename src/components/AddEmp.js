import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import empService from "../services/empService";

const AddEmp = () =>{
    
    const [name,setName] = useState(""); //name is the state, setName is a function that updates the state
    const [location,setLocation] = useState("");
    const [department,setDepartment] = useState("");
    
    const navigate = useNavigate(); //used to navigate to another page, used as navigate("page path here")

    //gets the person.id from : <td><Link className="btn btn-primary" to = {`/Edit/${person.id}`}>Update</Link></td> in Emp.js.
    //what happens is when we click the update button in Emp component, the id of that employee gets passed in the url, and we can retrieve
    //that id with useParams() to be used by our current component AddEmp, so that if this id exists (if its in the url), it means we clicked
    //from the update button and we're doing a put request, else if it doesn't exist, we're doing a post request
    const {id} = useParams(); 
    
    /* Create/Update part is the hardest in CRUD atleast for this app, so the general process is as follows (with some other omitted steps in between):
    We take user input from the app itself which is found in the return() method below, and upon clicking the save button, each input is passed
    as one argument into saveEmp(e). This function then puts all those parameters into one variable "employee" to be passed as argument for the API
    post/put, which we call with the help of the empService.

    */

    const saveEmp = (e) => {
        e.preventDefault(); //prevents refreshing
        const employee = {id,name,location,department}
        if(id){//update (put)
            console.log(id);
            empService.putEmployee(employee)
            .then(response => {
                console.log("Employee updated");
                navigate("/Emp")
            })
            .catch(error => console.log("Something went wrong")) //promise
        }
        else{//add (post)
            empService.postEmployee(employee)
            .then(response => {
                console.log("Employee added");
                navigate("/Emp")
            })
            .catch(error => console.log("Something went wrong")) //promise
        }
       
    }
    /*
    This is an incomplete process. The goal was if we were to update an employee, it would be more convenient to already show the existing data
    to their respective input fields in /AddEmp page. This useEffect successfully retrieves the data to be updated, but doesn't put it into the 3 input
    fields, which might need mapping(?) or changing their value attributes(?)

    *if you uncomment this, the PUT will break. It will say that it updated, but it hasn't actually updated, could be because its updating with using the same values present (?)
    
    useEffect(
        ()=>{
            if(id){
                empService.getEmployee(id)
                .then(
                    employee => {
                        setName(employee.data.name);
                        setLocation(employee.data.location);
                        setDepartment(employee.data.department);
                    }
                )
                .catch(
                    error => {
                        console.error("Something went wrong",error);
                    }
                )
            }
        }
    )
    */
    
    return(
        <div className ="container">
            <h1>Add Employees</h1>
            <form>
                <div className="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder ="Input employee name" onChange = {
                        (e) => setName(e.target.value)  //updates the states
                    }
                    />
                </div>
               
                <div className="mb-3">
                    <label for="location" className="form-label">Location</label>
                    <input type="text" className="form-control" id="location" placeholder ="Input employee location" onChange = {
                        (e) => setLocation(e.target.value)  
                    }/>
                </div>

                <div className="mb-3">
                    <label for="department" className="form-label">Department</label>
                    <input type="text" className="form-control" id="department" placeholder ="Input employee department" onChange = {
                        (e) => setDepartment(e.target.value) 
                    }/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={(e) => saveEmp(e)}>Save</button> 
            </form>
        </div>
    )
}
export default AddEmp;