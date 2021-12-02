import { useEffect, useState } from "react";
import empService from "../services/empService";
const Emp = () =>{
    const [emp,setEmp] = useState([]);

    useEffect(()=>{
        empService.getEmployees().then(response => {setEmp(response.data)}).catch(err=>{console.log("something went wrong")})
    })
    return (
        <div>
            <h3>List of Employees</h3>
            <div>
                <table border = "1">
                    <tr>
                        <td>Name</td>
                        <td>Department</td>
                        <td>Location</td>
                    </tr>
                    {
                        emp.map(
                            person => (
                                <tr key={person.id}>
                                    <td>{person.name}</td>
                                    <td>{person.department}</td>
                                    <td>{person.location}</td>
                                </tr>
                            )
                        )
                    }
                </table>
            </div>
        </div>
    )
}
export default Emp;