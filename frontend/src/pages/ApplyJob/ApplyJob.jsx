import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const ApplyJob = () => {
    const {user} = useAuth();
    const {id} = useParams();
    
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        coverLetter: "",
        portfolio: "",
        linkedIn: "",
        expectedSalary: "",
        availableStartDate: "",
        additionalInfo: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    // eslint-disable-next-line no-unused-vars
    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim())
            newErrors.firstName = "First name is required";
        if (!formData.lastName.trim())
            newErrors.lastName = "Last name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        if (!formData.phone.trim())
            newErrors.phone = "Phone number is required";
        if (!formData.address.trim()) newErrors.address = "Address is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.state.trim()) newErrors.state = "State is required";
        if (!formData.zipCode.trim())
            newErrors.zipCode = "ZIP code is required";
        if (!formData.coverLetter.trim())
            newErrors.coverLetter = "Cover letter is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true); // ✅ Set loading state here
        const newApplication = {job_id:id,email:user.email,...formData}
        try {
            await axios.post(
                "http://localhost:3000/api/job-applications",
                newApplication,{
                    timeout:3000
                }
            );

            alert("Application submitted successfully!");

            // Reset form
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                address: "",
                city: "",
                state: "",
                zipCode: "",
                coverLetter: "",
                portfolio: "",
                linkedIn: "",
                expectedSalary: "",
                availableStartDate: "",
                additionalInfo: "",
            });

            navigate("/");
        } catch (error) {
            console.error("Submission error:", error);
            alert(
                "Error submitting application. Please try again. Error: " +
                    (error?.response?.data?.message || error.message)
            );
        } finally {
            setIsSubmitting(false); // ✅ Reset loading state only after everything is done
        }
    };

    // Icons
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

    const ArrowLeftIcon = () => (
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
        </svg>
    );
    return (
        <div className="min-h-screen bg-base-200 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-ghost gap-2 mb-4"
                    >
                        <ArrowLeftIcon />
                        Back to Job Details
                    </button>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body text-center">
                            <h1 className="text-3xl lg:text-4xl font-bold text-base-content mb-2">
                                Apply for Position
                            </h1>
                            <p className="text-lg text-base-content/70">
                                Fill out the form below to submit your
                                application
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Personal Information */}
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-6 gap-2">
                                <UserIcon />
                                Personal Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            First Name *
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className={`input input-bordered w-full ${
                                            errors.firstName
                                                ? "input-error"
                                                : ""
                                        }`}
                                        placeholder="Enter your first name"
                                    />
                                    {errors.firstName && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.firstName}
                                            </span>
                                        </label>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Last Name *
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className={`input input-bordered w-full ${
                                            errors.lastName ? "input-error" : ""
                                        }`}
                                        placeholder="Enter your last name"
                                    />
                                    {errors.lastName && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.lastName}
                                            </span>
                                        </label>
                                    )}
                                </div>
                                

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Phone Number *
                                        </span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className={`input input-bordered w-full ${
                                            errors.phone ? "input-error" : ""
                                        }`}
                                        placeholder="Enter your phone number"
                                    />
                                    {errors.phone && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.phone}
                                            </span>
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Address Information */}
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-6">
                                Address Information
                            </h2>
                            <div className="grid grid-cols-1 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Street Address *
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className={`input input-bordered w-full ${
                                            errors.address ? "input-error" : ""
                                        }`}
                                        placeholder="Enter your street address"
                                    />
                                    {errors.address && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.address}
                                            </span>
                                        </label>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">
                                                City *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className={`input input-bordered w-full ${
                                                errors.city ? "input-error" : ""
                                            }`}
                                            placeholder="City"
                                        />
                                        {errors.city && (
                                            <label className="label">
                                                <span className="label-text-alt text-error">
                                                    {errors.city}
                                                </span>
                                            </label>
                                        )}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">
                                                State *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            className={`input input-bordered w-full ${
                                                errors.state
                                                    ? "input-error"
                                                    : ""
                                            }`}
                                            placeholder="State"
                                        />
                                        {errors.state && (
                                            <label className="label">
                                                <span className="label-text-alt text-error">
                                                    {errors.state}
                                                </span>
                                            </label>
                                        )}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">
                                                ZIP Code *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            className={`input input-bordered w-full ${
                                                errors.zipCode
                                                    ? "input-error"
                                                    : ""
                                            }`}
                                            placeholder="ZIP Code"
                                        />
                                        {errors.zipCode && (
                                            <label className="label">
                                                <span className="label-text-alt text-error">
                                                    {errors.zipCode}
                                                </span>
                                            </label>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Documents & Portfolio */}
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-6 gap-2">
                                Portfolio
                            </h2>
                            <div className="space-y-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Portfolio URL
                                        </span>
                                    </label>
                                    <input
                                        type="url"
                                        name="portfolio"
                                        value={formData.portfolio}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                        placeholder="https://your-portfolio.com"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            LinkedIn Profile
                                        </span>
                                    </label>
                                    <input
                                        type="url"
                                        name="linkedIn"
                                        value={formData.linkedIn}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                        placeholder="https://linkedin.com/in/yourprofile"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cover Letter */}
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-6 gap-2">
                                <MailIcon />
                                Cover Letter
                            </h2>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        Cover Letter *
                                    </span>
                                </label>
                                <textarea
                                    name="coverLetter"
                                    value={formData.coverLetter}
                                    onChange={handleInputChange}
                                    className={`textarea textarea-bordered h-40 w-full ${
                                        errors.coverLetter
                                            ? "textarea-error"
                                            : ""
                                    }`}
                                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                                ></textarea>
                                {errors.coverLetter && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">
                                            {errors.coverLetter}
                                        </span>
                                    </label>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-6">
                                Additional Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Expected Salary
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="expectedSalary"
                                        value={formData.expectedSalary}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                        placeholder="e.g., $60,000 - $80,000"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Available Start Date
                                        </span>
                                    </label>
                                    <input
                                        type="date"
                                        name="availableStartDate"
                                        value={formData.availableStartDate}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                    />
                                </div>
                            </div>

                            <div className="form-control mt-6">
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        Additional Information
                                    </span>
                                </label>
                                <textarea
                                    name="additionalInfo"
                                    value={formData.additionalInfo}
                                    onChange={handleInputChange}
                                    className="textarea textarea-bordered h-32 w-full"
                                    placeholder="Any additional information you'd like to share..."
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Submit Section */}
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`btn btn-primary btn-lg gap-2 ${
                                        isSubmitting ? "loading" : ""
                                    }`}
                                >
                                    {!isSubmitting && <MailIcon />}
                                    {isSubmitting
                                        ? "Submitting Application..."
                                        : "Submit Application"}
                                </button>
                                <Link
                                    to="/job-details"
                                    className="btn btn-outline btn-lg"
                                >
                                    Cancel
                                </Link>
                            </div>
                            <div className="text-center mt-4">
                                <p className="text-sm text-base-content/60">
                                    By submitting this application, you agree to
                                    our terms and conditions.
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplyJob;
