const API_URL = "http://localhost:3000/jobs"

import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'

const UseJobs = () => {

    const [jobs,setJobs] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("")

    const[reloadKey,setReloadKey] = useState(0)

    const refresh = useCallback(() =>{
        setReloadKey((current)=> current +1 );
    },[])

    useEffect(()=> {
        const controller = new AbortController();
        async function loadJobs() {
            try{
                setLoading(true);
                setError("");
                const response = await fetch(API_URL, {
                    signal: controller.signal
                });
                if(!response.ok){
                    throw newError(`Request Failed: ${response.status}`);
                }

                const data = await response.json();
                setJobs(data)
            } catch(err){
                if(err.name !== "AbortError"){
                    setError(err.message || "Could not  load application")
                }
            } finally {
                if(!controller.signal.aborted){
                    setLoading(false)
                }
            }
        }
        loadJobs();
        return() => controller.abort();
    },[reloadKey]);

    return {jobs,setJobs,loading,error,refresh};
}

export default UseJobs