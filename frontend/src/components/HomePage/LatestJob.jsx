import { useEffect, useState } from "react";
import axios from "axios";
const LatestJob = () => {
    const [jobs, setJobs] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3000/api/jobs")
        .then(res=>{
            setJobs(res.data);
        })
        .catch(err=>{
            console.log(err.message);
        })
    },[]);
    console.log(jobs);
    
    return (
        <div>
            <h2 className='text-3xl border-b-3 ms-2'>LATEST JOBS</h2>
            <div className="">

            </div>
        </div>
    );
};

export default LatestJob;