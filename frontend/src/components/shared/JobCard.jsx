import { RiMapPin2Fill } from "react-icons/ri";
import { FaBriefcase } from "react-icons/fa";
import { Link } from 'react-router-dom';

const JobCard = ({ jobData }) => {
    const formatSalary = (min, max, currency) => {
        return `${min / 1000}k - ${max / 1000}k ${currency}`;
    };

    return (
        <div className="h-full p-5 flex flex-col  bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border">
            <div className="flex-1">
                {/* Header */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center space-x-3">
                        <img
                            src={jobData.company_logo || "/placeholder.svg"}
                            alt={jobData.company}
                            className="w-10 h-10 rounded-lg object-contain bg-white p-1"
                        />
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                                {jobData.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {jobData.company}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                            <RiMapPin2Fill />
                            <span className="ml-1">{jobData.location}</span>
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            <FaBriefcase />
                            <span className="ml-1">{jobData.jobType}</span>
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                    {/* Salary */}
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Salary</span>
                        <span className="text-lg font-bold text-green-600">
                            {formatSalary(
                                jobData.salaryRange.min,
                                jobData.salaryRange.max,
                                jobData.salaryRange.currency
                            )}
                        </span>
                    </div>

                    {/* Requirements */}
                    <div>
                        <p className="text-sm text-gray-600 mb-2">
                            Skills Required
                        </p>
                        <div className="flex flex-wrap gap-1">
                            {jobData.requirements.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Actions */}
            <div className="flex gap-2 pt-2">
                <Link to={`/api/jobs/${jobData._id}`} className="flex-1 text-center bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                    Apply Now
                </Link>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50 transition-colors">
                    Save
                </button>
            </div>
        </div>
    );
};

export default JobCard;
