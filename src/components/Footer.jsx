const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-6 mt-10">
            <div className="container mx-auto px-6 flex flex-row justify-center items-center">
                
                <div className=" flex flex-row justify-center items-center  ">
                    <h2 className="text-xl font-bold">Country Blogs</h2>
                    <p className="text-gray-400 text-sm">© {new Date().getFullYear()} All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
