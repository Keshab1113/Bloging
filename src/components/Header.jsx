import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = ({ blogs }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredResults([]);
            return;
        }
        const results = blogs.filter((blog) =>
            blog?.name?.common?.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setFilteredResults(results);
    }, [searchQuery, blogs]);

    return (
        <header className="bg-white p-4 px-10 flex flex-col shadow-md">
            <div className="flex items-center justify-between">
                <h1 className="text-black text-2xl font-bold">
                    <Link to="/">Country Blogs</Link>
                </h1>
                <div className="flex gap-4 items-center justify-between">
                    <div className="flex gap-4">
                        {location.pathname.startsWith("/blog/") && (
                            <Link to="/" className="text-black bg-gray-100 px-4 py-2 rounded-lg font-medium">All Blogs</Link>
                        )}
                    </div>
                <div className="relative w-64">
                    <input
                        type="text"
                            placeholder="Search Country..."
                        className="outline-none px-2 py-1 w-full rounded-lg border border-gray-300"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {filteredResults.length > 0 && (
                        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">
                            {filteredResults.map((blog) => (
                                <div key={blog.id} className="p-2 hover:bg-gray-100 flex justify-between items-center">
                                    <span className="text-gray-800 truncate whitespace-nowrap max-w-[120px]">{blog.name.common}</span>
                                    <button
                                        className="bg-slate-500 text-white px-3 py-1 rounded-lg text-sm cursor-pointer"
                                        onClick={() => {
                                            setSearchQuery("")
                                            navigate(`/blog/${blog.cca3}`)
                                        }}
                                    >
                                        Read More
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
