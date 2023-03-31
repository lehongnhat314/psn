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
                console.log("HERE");
                const myNpsso = "zzz";

                // We'll exchange your NPSSO for a special access code.
                const accessCode = await exchangeNpssoForCode(myNpsso);

                // We can use the access code to get your access token and refresh token.
                const authorization = await exchangeCodeForAccessToken(accessCode);

                // This returns a list of all the games you've earned trophies for.
                const userTitlesResponse = await getUserTitles(
                  { accessToken: authorization.accessToken },
                  "me"
                );
                console.log(userTitlesResponse);
                setData(userTitlesResponse);
                ;
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);
    return <div>{data}</div>
}

export default getData;