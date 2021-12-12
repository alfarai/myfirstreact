import PageNotFound from "./PageNotFound"
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./Home";
import Emp from "./Emp";
import AddEmp from "./AddEmp";

const Router = () => { //used for routing, exact path is the url, element is the component to be displayed for the given url
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/myfirstreact" element = {<Home/>}/>
                    <Route exact path="/myfirstreact/" element = {<Home/>}/>
                    <Route exact path="*" element = {<PageNotFound/>}/>
                    <Route exact path = "/Emp" element = {<Emp/>}/>
                    <Route exact path = "/AddEmp" element = {<AddEmp/>}/>
                    <Route exact path = "/Edit/:id" element = {<AddEmp/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default Router;