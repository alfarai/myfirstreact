import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import empService from "../services/empService";
const Emp = () =>{ //used to show the employee table list
    //emp is state, setEmp is a setter function for emp
    const [emp,setEmp] = useState([]);

    //called every render of react. these are "side effects" such as changing the DOM, or data fetching (what we're doing).
    //after rendering the page itself on the return(), we perform useEffect() to fetch the data from our API. We get a list/array of employees from 
    //the response.data and we set it to the emp variable using setEmp(), which will be used to map values to our table inside return()
    useEffect(()=>{
        refreshTable();
    })

    const refreshTable = ()=>{ //contents of useEffect was moved here
        empService.getEmployees() //promise
        .then(response => {
            setEmp(response.data)
        })
        .catch(err => {
            console.log("something went wrong")
        })
    }
    /*Process for deletion :
    We made the actual database deletion code in the API, which we are calling from the empService.js methods. We created a new function above called
    refreshTable so we can use it to manually refresh table upon deletion by the onClick function, where we pass an event e to (e) and calls on
    deleteEmp(person.id), which is the function that calls the method from the API through our service (promise).
    */

    const deleteEmp = (id) => {
        empService.deleteEmployee(id)
        .then(
            response => {
                console.log("Successfully deleted employee");
                refreshTable(); //manually refresh the table upon successful response (deletion)
            }
        )
        .catch(
            error => {
                console.error("Something went wrong",error);
            }
        )
    }
    return (
        <div className = "container">
            <h3>List of Employees</h3>
            <div>
                <table className = "table table-hover table-light">
                    <thead className = "table-warning">
                    <tr>
                        <td>Name</td>
                        <td>Department</td>
                        <td>Location</td>
                        <td>Actions</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        emp.map( //takes the list of employees fetched from API and maps each parameters of an employee to is respective column.
                            person => (
                                //the link tag below creates a button such that when clicked, takes the id of the employee (${person.id}) 
                                //and passes it as paramter to the url /Edit/... which routes to this part of Router.js :  <Route exact path = "/Edit/:id" element = {<AddEmp/>}/>.
                                //Note that link is used for routing, so delete function doesnt need it since we just want to delete
                                <tr key={person.id}>
                                    <td>{person.name}</td>
                                    <td>{person.department}</td>
                                    <td>{person.location}</td>
                                    <td>
                                        <div className = "d-grid gap-2 d-md-flex content-md-end">
                                            <Link className="btn btn-primary" to = {`/Edit/${person.id}`}>Update</Link> 
                                            <button className="btn btn-danger" onClick = {(e)=>deleteEmp(person.id)}>Delete</button>
                                        </div>
                                        
                                    </td> 
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Emp;