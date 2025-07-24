import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../shared/JobCard";
const LatestJob = () => {
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        axios
            .get("https://jobseekerapi-one.vercel.app/api/jobs")
            .then((res) => {
                setJobs(res.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div className="p-5 bg-base-200">
            <h2 className="text-3xl border-b-3">LATEST JOBS</h2>
            <div className="grid grid-cols-3 gap-5 items-stretch p-5">
                {
                    jobs.length===0 ? (
                        <span className="loading loading-bars loading-xl"></span>
                    ) : (
                        jobs.map((job, idx) => (
                    <JobCard key={idx} jobData={job} />
                ))
                    )
                }
            </div>
        </div>
    );
};

export default LatestJob;
