import team from "../../assets/team.jpg";

const Banner = () => {
    return (
        <div className="">
            <div className="p-5 bg-base-200">
                <div className="flex-col flex items-center lg:flex-row-reverse md:w-full">
                    <img
                        src={team}
                        className="rounded-lg shadow-2xl md:w-1/2"
                    />
                    <div className="md:w-1/2 py-3">
                        <h1 className="md:text-5xl text-3xl font-bold">
                            Grab the Latest Job
                        </h1>
                        <p className="py-6">
                            Unlock your future with real-time job listings
                            tailored for ambitious minds. Whether you're chasing
                            your first role or your dream position, discover
                            fresh opportunities curated just for you.
                        </p>
                        <button className="btn btn-primary">Grab Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
