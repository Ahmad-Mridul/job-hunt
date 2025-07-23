const JobCard = ({ jobData }) => {
    // const jobData = {
    //     title: "Software Engineer",
    //     location: "Chittagong",
    //     jobType: "Hybrid",
    //     company: "Favorite IT",
    //     salaryRange: { min: 40000, max: 60000, currency: "BDT" },
    //     requirements: ["JavaScript", "React", "Node.js"],
    //     company_logo: "https://i.ibb.co/mXD5MNf/facebook.png",
    // };

    const formatSalary = (min, max, currency) => {
        return `${min / 1000}k - ${max / 1000}k ${currency}`;
    };

    // Simple Icons
    const MapPinIcon = () => (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
            />
        </svg>
    );

    const BriefcaseIcon = () => (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
                fillRule="evenodd"
                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm4-1a1 1 0 00-1 1v1h2V6a1 1 0 00-1-1z"
                clipRule="evenodd"
            />
        </svg>
    );

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
                            <MapPinIcon />
                            <span className="ml-1">{jobData.location}</span>
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            <BriefcaseIcon />
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
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                    Apply Now
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50 transition-colors">
                    Save
                </button>
            </div>
        </div>
    );
};

export default JobCard;
