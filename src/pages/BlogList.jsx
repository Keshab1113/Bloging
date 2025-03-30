import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../features/blogSlice";
import { Link, useNavigate } from "react-router-dom";

export const colors = [
    "bg-red-200 text-red-800",
    "bg-green-200 text-green-800",
    "bg-blue-200 text-blue-800",
    "bg-yellow-200 text-yellow-800",
    "bg-purple-200 text-purple-800",
    "bg-pink-200 text-pink-800",
    "bg-indigo-200 text-indigo-800",
    "bg-teal-200 text-teal-800",
    "bg-orange-200 text-orange-800"
];

const BlogList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { blogs, status, error } = useSelector((state) => state.blogs);
    const [selectedRegion, setSelectedRegion] = useState(null);
    

    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    if (status === "loading") return <p>Loading...</p>;
    if (status === "failed") return <p>Error: {error}</p>;

    const groupedBlogs = blogs.reduce((acc, blog) => {
        const region = blog.region || "Unknown";
        if (!acc[region]) acc[region] = [];
        acc[region].push(blog);
        return acc;
    }, {});

    const sortedRegions = Object.keys(groupedBlogs).sort();

    const getColor = (language) => {
        let hash = 0;
        for (let i = 0; i < language.length; i++) {
            hash = language.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-3xl font-bold mb-5">Country List</h1>
            {selectedRegion ? (
                <div>
                    <div className="flex px-4 h-20 items-center justify-between border-b border-slate-200 mb-5 bg-slate-100 shadow-xl rounded-lg">
                        <h2 className="text-2xl font-bold text-black">{selectedRegion}</h2>
                        <button onClick={() => setSelectedRegion(null)} className="text-red-500 cursor-pointer">
                            View less
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groupedBlogs[selectedRegion].map((blog) => (
                            <div key={blog.cca3} className="p-4 border border-slate-200 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300" onClick={() => navigate(`/blog/${blog.cca3}`)}>
                                <div>
                                    <img src={blog.flags?.png} alt={blog.name.common} className="w-full h-[200px] object-cover rounded-lg" />
                                </div>
                                <div className="flex flex-col gap-2 mt-4">
                                    <h2 className="text-xl font-bold truncate">{blog.name.official}</h2>
                                    <h2 className="text-lg truncate text-black font-bold">{blog.name.common}</h2>
                                    <p className="text-sm text-gray-500"><span className="font-bold">Capital:</span> {blog.capital?.[0] || "N/A"}</p>
                                    <p className="text-sm text-gray-500"><span className="font-bold">Population:</span> {blog.population.toLocaleString()}</p>
                                    <div>
                                        <h2 className="text-sm text-gray-500 font-bold mb-2">Language:</h2>
                                        <ul className="flex flex-wrap gap-2">
                                            {blog.languages && Object.values(blog.languages).slice(0, 4).map((language) => (
                                                <li key={language} className={`text-sm px-2 py-1 rounded-lg w-fit font-medium ${getColor(language)}`}>{language}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                sortedRegions.map((region) => (
                    <div key={region} className="mb-10">
                        <div className="flex px-4 h-20 items-center justify-between border-b border-slate-200 mb-5 bg-slate-100 shadow-xl rounded-lg">
                            <h2 className="text-2xl font-bold text-black">{region}</h2>
                            <button onClick={() => setSelectedRegion(region)} className="text-blue-500 cursor-pointer">
                                View All
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {groupedBlogs[region].slice(0, 3).map((blog) => (
                                <div key={blog.cca3} className="p-4 border border-slate-200 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300" onClick={() => navigate(`/blog/${blog.cca3}`)}>
                                    <div>
                                        <img src={blog.flags?.png} alt={blog.name.common} className="w-full h-[200px] object-cover rounded-lg" />
                                    </div>
                                    <div className="flex flex-col gap-2 mt-4">
                                        <h2 className="text-xl font-bold truncate">{blog.name.official}</h2>
                                        <h2 className="text-lg truncate text-black font-bold">{blog.name.common}</h2>
                                        <p className="text-sm text-gray-500"><span className="font-bold">Capital:</span> {blog.capital?.[0] || "N/A"}</p>
                                        <p className="text-sm text-gray-500"><span className="font-bold">Population:</span> {blog.population.toLocaleString()}</p>
                                        <div>
                                            <h2 className="text-sm text-gray-500 font-bold mb-2">Language:</h2>
                                            <ul className="flex flex-wrap gap-2">
                                                {blog.languages && Object.values(blog.languages).slice(0, 4).map((language) => (
                                                    <li key={language} className={`text-sm px-2 py-1 rounded-lg w-fit font-medium ${getColor(language)}`}>{language}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default BlogList;
