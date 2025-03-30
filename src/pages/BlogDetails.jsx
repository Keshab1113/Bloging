import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "./BlogList";
import MapContainer from "../components/MapContainer";
import { useState } from "react";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import { addComment, toggleLike } from "../features/blogSlice";


const BlogDetails = () => {
    const { id } = useParams();
    const { blogs } = useSelector((state) => state.blogs);
    const blog = blogs.find((b) => b.cca3 === id);
    const dispatch = useDispatch();
    const likes = useSelector((state) => state.blogs.likes[blog?.cca3] || 0);
    const comments = useSelector((state) => state.blogs.comments[blog?.cca3] || []);
    const [commentText, setCommentText] = useState("");
    const [commentName, setCommentName] = useState("");

    const handleLike = () => {
        dispatch(toggleLike(blog.cca3));
    };

    const handleAddComment = () => {
        if (commentName.trim() !== "" && commentText.trim() !== "") {
            dispatch(addComment({ blogId: blog.cca3, name: commentName, text: commentText }));
            setCommentName("");
            setCommentText("");
        }
    };


    if (!blog) return <p>Blog not found</p>;

    const getColor = (language) => {
        let hash = 0;
        for (let i = 0; i < language.length; i++) {
            hash = language.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    const borderCountries = blog.borders
        ? blog.borders
            .map(code => {
                const country = blogs.find(c => c.cca3 === code);
                return country ? country.name.common : code;
            })
            .join(", ")
        : "N/A";



    return (
        <div className="container mx-auto p-5">
            <h1 className="text-5xl font-bold">{blog.name.official}</h1>
            <h1 className="text-2xl font-bold">{blog.name.common}</h1>

            <div className="flex md:flex-row flex-col w-full mt-10">
                <div className="md:w-[70%] w-full md:pr-10 capitalize flex flex-col gap-2">
                    <div className="text-lg w-full flex gap-2"> <p className="font-bold md:w-[200px] w-[120px]">Region:</p> <span>{blog.region}</span></div>
                    <div className="text-lg w-full flex gap-2"> <p className="font-bold md:w-[200px] w-[120px]">Subregion:</p> <span>{blog.subregion}</span></div>
                    <div className="text-lg w-full flex gap-2"> <p className="font-bold md:w-[200px] w-[120px]">Capital:</p> <span>{blog.capital?.[0]}</span></div>
                    <div className="text-lg w-full flex gap-2"> <p className="font-bold md:w-[200px] w-[120px]">Population:</p> <span>{blog.population.toLocaleString()}</span></div>
                    <div className="text-lg w-full flex gap-2"> <p className="font-bold md:w-[200px] w-[120px]">Area:</p> <span>{blog.area.toLocaleString()} km²</span></div>
                    <div className="text-lg w-full flex gap-2"> <p className="font-bold md:w-[200px] w-[120px]">Continent:</p> <span>{blog.continents.join(", ")}</span></div>
                    <div className="text-lg w-full flex gap-2"> <p className="font-bold md:w-[200px] w-[120px]">Independent:</p> <span>{blog.independent ? "Yes" : "No"}</span></div>
                    <div className="text-lg w-full flex gap-2"> <p className="font-bold md:w-[200px] w-[120px]">Landlocked:</p> <span>{blog.landlocked ? "Yes" : "No"}</span></div>
                    <div className="text-lg w-full flex gap-2"> <p className="font-bold md:w-[200px] w-[120px]">Start of Week:</p> <span>{blog.startOfWeek}</span></div>
                    <div className="text-lg w-full flex gap-2"> <p className="font-bold md:w-[200px] w-[120px]">Status:</p> <span>{blog.status}</span></div>
                    <div className="text-lg w-full flex gap-2"> <p className="font-bold md:w-[200px] w-[120px]">Timezones:</p> <span>{blog.timezones.join(", ")}</span></div>
                    <div className="text-lg w-full flex gap-2"> <p className="font-bold md:w-[200px] w-[120px]">UnMember:</p> <span>{blog.unMember ? "Yes" : "No"}</span></div>
                    <div className="text-lg w-full flex gap-2">
                        <p className="font-bold md:w-[200px] w-[120px]">Demonym:</p>
                        <div className=" flex flex-col">
                            <span>{blog.demonyms?.eng ? `${blog.demonyms.eng.m} / ${blog.demonyms.eng.f} (English)` : "N/A"},</span>
                            <span>{blog.demonyms?.fra ? `${blog.demonyms.fra.m} / ${blog.demonyms.fra.f} (French)` : "N/A"}</span>
                        </div>
                    </div>
                    <div className="text-lg w-full flex gap-2">
                        <p className="font-bold md:w-[200px] w-[120px]">Car:</p> <span>{blog.car?.side}</span>
                    </div>


                    <div className="text-lg w-full flex gap-2">
                        <p className="font-bold md:w-[200px] w-[120px]">Alternative Names:</p> <span>{blog.altSpellings ? blog.altSpellings.join(", ") : "N/A"}</span>
                    </div>
                    <div className="text-lg w-full flex gap-2">
                        <p className="font-bold md:w-[200px] w-[120px]">Borders:</p>
                        <span>
                            {borderCountries}
                        </span>
                    </div>

                    <div className="flex gap-2 text-lg">
                        <p className="font-bold md:w-[200px] w-[120px]">Currency:</p>
                        <ul className="flex flex-wrap gap-2">
                            {blog.currencies && Object.values(blog.currencies).map((currencie) => (
                                <li key={currencie} className="text-lg">{currencie.name} ({currencie.symbol})</li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex gap-2 text-lg">
                        <p className="font-bold md:w-[200px] w-[120px]">Language:</p>
                        <ul className="flex flex-wrap gap-2">
                            {blog.languages && Object.values(blog.languages).map((language) => (
                                <li key={language} className={`text-sm px-2 py-1 rounded-lg w-fit font-medium ${getColor(language)}`}>{language}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full mt-10 border-t border-slate-200 pt-10">
                        <h2 className="text-2xl font-bold mb-4">National Flag:</h2>
                        {blog.flags && (
                            <img
                                src={blog.flags.png}
                                alt={`Flag of ${blog.name.common}`}
                                className="md:w-[500px] w-full h-[300px] mb-4 shadow-lg rounded-lg"
                            />
                        )}
                    </div>
                    {blog.latlng && (
                        <div className="mt-4 ">
                            <h2 className="text-2xl font-bold mb-4"> ViewMap:</h2>
                            <MapContainer
                                lat={parseFloat(blog?.latlng?.[0]) || 37.7749}
                                lng={parseFloat(blog?.latlng?.[1]) || -122.4194}
                                zoom={0}
                            />

                        </div>
                    )}

                </div>
                <div className="md:w-[30%] w-full flex flex-col gap-4">
                    <div className="w-full">
                        {blog.coatOfArms && (
                            <img
                                src={blog.coatOfArms.png || blog.coatOfArms.svg || blog.flags.png}
                                alt={`Flag of ${blog.name.common}`}
                                className="w-full h-full max-h-[500px] mb-4 shadow-lg rounded-lg"
                            />
                        )}
                    </div>
                    <div className="w-full">
                        <ul>
                            {blog.translations && Object.values(blog.translations).map((translation) => (
                                <li key={translation} className="flex flex-col gap-2">
                                    <h2 className="text-sm font-bold">{translation.official}</h2>
                                    <p className="text-sm">{translation.common}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-md my-4">
                <h2 className="text-xl font-bold">{blog.name.common}</h2>
                <p className="text-gray-600">{blog.region} | {blog.subregion}</p>

                <div className="flex items-center gap-4 mt-3">
                    <button onClick={handleLike} className="flex items-center gap-1 text-red-500">
                        {likes > 0 ? <FaHeart /> : <FaRegHeart />}
                        <span>{likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-blue-500">
                        <FaComment />
                        <span>{comments.length}</span>
                    </button>
                </div>

               
                    <div className="mt-3 border-t border-slate-200 pt-3 flex flex-col gap-2 justify-start items-start">
                        <h3 className="font-semibold text-2xl">Comments</h3>
                        <div className="mt-3 flex flex-col gap-2 md:w-[40rem] w-full">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="border p-2 rounded w-full"
                                value={commentName}
                                onChange={(e) => setCommentName(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Write a comment..."
                                className="border p-2 rounded w-full"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                            <button
                                onClick={handleAddComment}
                                className="bg-slate-600 hover:bg-slate-700 cursor-pointer text-white px-3 py-2 rounded"
                            >
                                Post
                            </button>
                        </div>
                        
                        <ul className="mt-2 space-y-2 md:w-[40rem] w-full">
                            {comments.map((comment) => (
                                <li key={comment.id} className="text-sm bg-gray-100 p-2 rounded-md">
                                    <strong>{comment.name}</strong>: {comment.text}
                                </li>
                            ))}
                        </ul>
                    </div>
            </div>

        </div>
    );
};

export default BlogDetails;
