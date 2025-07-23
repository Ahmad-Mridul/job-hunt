import logo from "../../assets/job.png"
const Footer = () => {
    return (
        <footer className="footer flex items-center justify-center border-t-2 sm:footer-horizontal bg-base-200 text-base-content p-10">
            <>
                <img src={logo} className="w-1/7" alt="" />
                <h2 className="text-4xl">
                    JOB HUNT
                </h2>
            </>
        </footer>
    );
};

export default Footer;
