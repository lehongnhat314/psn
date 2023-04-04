import React, {useState, useEffect} from "react"
import {
    exchangeNpssoForCode,
    exchangeCodeForAccessToken,
    getUserTitles
} from 'psn-api';


const getData = () => {
    const [data, setData] = useState([]);
    
    useEffect( () => { 
        async function fetchData() {
            try {
                const response = await fetch("/api/fetchData", {
                  method: "POST",
                });
                const response_json = await response.json();
                setData(response_json.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);
    return <div>{data}</div>
}

export default getData;