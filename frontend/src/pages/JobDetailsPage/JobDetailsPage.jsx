import { useLoaderData } from "react-router-dom";

const JobDetailsPage = () => {
    const job = useLoaderData();

    const formatSalary = (min, max, currency) =>
        `${min / 1000}k - ${max / 1000}k ${currency.toUpperCase()}`;

    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

    // Simple Icons
    const MapPinIcon = () => (
        <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
        </svg>
    );

    const BriefcaseIcon = () => (
        <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0v6a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0V4a2 2 0 00-2-2H10a2 2 0 00-2 2v2"
            />
        </svg>
    );

    const CalendarIcon = () => (
        <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
        </svg>
    );

    const DollarSignIcon = () => (
        <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
            />
        </svg>
    );

    const UserIcon = () => (
        <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
        </svg>
    );

    const MailIcon = () => (
        <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
        </svg>
    );

    const BookmarkIcon = () => (
        <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
        </svg>
    );

    return (
        <div className="min-h-screen bg-base-200 py-8">
            <div className="max-w-5xl mx-auto px-4">
                {/* Hero Card */}
                <div className="card bg-base-100 shadow-xl mb-8">
                    <div className="card-body">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                            <div className="avatar">
                                <div className="w-24 h-24 rounded-xl bg-base-200 p-2">
                                    <img
                                        src={
                                            job.company_logo ||
                                            "/placeholder.svg"
                                        }
                                        alt={job.company}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>

                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div>
                                        <h1 className="text-3xl lg:text-4xl font-bold text-base-content mb-2">
                                            {job.title}
                                        </h1>
                                        <p className="text-lg text-base-content/70 mb-4">
                                            {job.company}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            <div className="badge badge-primary badge-lg gap-2">
                                                <MapPinIcon />
                                                {job.location}
                                            </div>
                                            <div className="badge badge-secondary badge-lg gap-2">
                                                <BriefcaseIcon />
                                                {job.jobType}
                                            </div>
                                            <div className="badge badge-accent badge-lg">
                                                {job.category}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className="badge badge-success badge-lg mb-2">
                                            {job.status.toUpperCase()}
                                        </div>
                                        <div className="text-2xl font-bold text-success">
                                            {formatSalary(
                                                job.salaryRange.min,
                                                job.salaryRange.max,
                                                job.salaryRange.currency
                                            )}
                                        </div>
                                        <p className="text-sm text-base-content/60">
                                            per month
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Job Description */}
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <h2 className="card-title text-2xl mb-4">
                                    Job Description
                                </h2>
                                <p className="text-base-content/80 leading-relaxed text-lg">
                                    {job.description}
                                </p>
                            </div>
                        </div>

                        {/* Requirements */}
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <h2 className="card-title text-2xl mb-4">
                                    Requirements
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {job.requirements.map((req, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-3 p-3 bg-base-200 rounded-lg"
                                        >
                                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                                            <span className="text-base-content/90">
                                                {req}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Responsibilities */}
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <h2 className="card-title text-2xl mb-4">
                                    Key Responsibilities
                                </h2>
                                <div className="space-y-3">
                                    {job.responsibilities.map((res, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-3 p-3 bg-base-200 rounded-lg"
                                        >
                                            <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                                            <span className="text-base-content/90">
                                                {res}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Info */}
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <h3 className="card-title text-xl mb-4">
                                    Job Details
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <DollarSignIcon />
                                        <div>
                                            <p className="font-semibold">
                                                Salary Range
                                            </p>
                                            <p className="text-success font-bold">
                                                {formatSalary(
                                                    job.salaryRange.min,
                                                    job.salaryRange.max,
                                                    job.salaryRange.currency
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="divider my-2"></div>

                                    <div className="flex items-center gap-3">
                                        <CalendarIcon />
                                        <div>
                                            <p className="font-semibold">
                                                Application Deadline
                                            </p>
                                            <p className="text-error font-medium">
                                                {formatDate(
                                                    job.applicationDeadline
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* HR Contact */}
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <h3 className="card-title text-xl mb-4 gap-2">
                                    <UserIcon />
                                    HR Contact
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="font-semibold text-lg">
                                            {job.hr_name}
                                        </p>
                                        <p className="text-base-content/60">
                                            Human Resources
                                        </p>
                                    </div>
                                    <a
                                        href={`mailto:${job.hr_email}`}
                                        className="btn btn-outline btn-sm gap-2 w-full"
                                    >
                                        <MailIcon />
                                        {job.hr_email}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <div className="space-y-3">
                                    <button className="btn btn-primary btn-lg w-full gap-2">
                                        <MailIcon />
                                        Apply Now
                                    </button>
                                    <button className="btn btn-outline btn-lg w-full gap-2">
                                        <BookmarkIcon />
                                        Save Job
                                    </button>
                                </div>
                                <div className="divider">OR</div>
                                <button className="btn btn-ghost btn-sm w-full">
                                    Share this job
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailsPage;
