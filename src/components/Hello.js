import { useEffect, useState } from "react";
import helloService from "../services/helloService";

const Hello = () => {

    const [hello,setHello] = useState("test");

    useEffect(()=>{
        helloService.getHello()
        .then(
        response => {
            setHello(response.data);
        }
        )
    })
    return hello;
}

export default Hello;