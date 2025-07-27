import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import Loading from "../../components/shared/Loading";

const MyApplications = () => {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        axios
            .get(
                `http://localhost:3000/api/my-applications?email=${user.email}`,{withCredentials:true}
            )
            .then((res) => setJobs(res.data));
    }, [user.email]);
    if(jobs.length===0){
        return <Loading/>
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Applicant</th>
                            <th>Job ID</th>
                            <th>Expected Salary</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job, idx) => (
                            <tr key={idx}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={job.company_logo}
                                                    alt={`${job.firstName} ${job.lastName}`}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">
                                                {job.company}
                                            </div>
                                            <div className="text-sm opacity-50">
                                                {job.title}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="badge badge-ghost badge-sm">
                                        Job ID: {job.job_id}
                                    </span>
                                </td>
                                <td>{job.expectedSalary || "N/A"}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">
                                        Details
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyApplications;
