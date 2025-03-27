import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../utils/utils';

function Home() {
    const [courses, setCourses] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("user");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/user/logout`, { withCredentials: true });
            toast.success(response.data.message);
            setIsLoggedIn(false);
            localStorage.removeItem("user");
        } catch (error) {
            toast.error(error.response?.data?.errors || "Error logging out");
        }
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/course/courses`, { withCredentials: true });
                setCourses(response.data.courses);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCourses();
    }, []);

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    centerPadding: "40px",
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerPadding: "20px",
                }
            }
        ]
    };

    return (
        <div className='bg-gradient-to-r from-black to-gray-800 min-h-screen text-white'>
            <div className='container mx-auto px-4 md:px-8'>
                {/* Header */}
                <header className='flex items-center justify-between py-4 flex-wrap'>
                    <div className='flex items-center space-x-2'>
                        <img src='logo.webp' className='w-16 h-16 rounded-full' alt="logo" />
                        <h1 className='text-xl md:text-2xl text-pink-600 font-bold font-serif'>
                            HustleLearn
                        </h1>
                    </div>

                    <div className='space-x-2 md:space-x-4 mt-2 md:mt-0'>
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className='bg-transparent text-white py-2 px-4 border border-white rounded'>
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link to={"/login"} className='bg-transparent text-white py-2 px-4 border border-white rounded'>
                                    Login
                                </Link>
                                <Link to={"/signup"} className='bg-transparent text-white py-2 px-4 border border-white rounded'>
                                    Signup
                                </Link>
                            </>
                        )}
                    </div>
                </header>

                {/* Main Section */}
                <section className='text-center py-6'>
                    <h1 className='text-2xl md:text-3xl font-semibold text-pink-600 font-serif'>
                        HustleLearn
                    </h1>
                    <div className='space-x-2 md:space-x-4 mt-4'>
                        <Link to={"/courses"} className='bg-orange-400 text-white py-2 px-4 md:py-3 md:px-6 rounded font-semibold hover:bg-white duration-300 hover:text-black'>
                            Explore Courses
                        </Link>
                        <Link to={"https://www.youtube.com/@ApnaCollegeOfficial"} className='bg-orange-400 text-white py-2 px-4 md:py-3 md:px-6 rounded font-semibold hover:bg-white duration-300 hover:text-black'>
                            Courses Videos
                        </Link>
                    </div>
                </section>

                {/* Course Slider */}
                <section className='mt-6 md:mt-10'>
                    <Slider {...settings}>
                        {courses.length > 0 ? (
                            courses.map(course => (
                                <div key={course._id} className='p-4'>
                                    <div className='relative w-full max-w-sm mx-auto transition-transform duration-300 transform hover:scale-105'>
                                        <div className='bg-gray-900 rounded-lg overflow-hidden'>
                                            <img
                                                className="h-48 md:h-60 w-full object-cover"
                                                src={course.image?.url || "default-image-url"}
                                                alt={course.title}
                                            />
                                            <div className='p-4 text-center'>
                                                <h2 className='text-lg md:text-xl font-bold text-white'>{course.title}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-white">No courses available at the moment.</p>
                        )}
                    </Slider>
                </section>

                <hr className="my-6 border-gray-600" />

                {/* Footer */}
                <footer className='mt-6'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left'>
                        <div className='flex flex-col items-center md:items-start'>
                            <div className='flex items-center space-x-2'>
                                <img src='logo.webp' className='w-14 h-14 rounded-full' alt="logo" />
                                <h1 className='text-xl text-pink-600 font-bold font-serif'>HustleLearn</h1>
                            </div>
                            <div className='mt-3'>
                                <p>Follow at</p>
                                <div className='flex space-x-4 mt-2'>
                                    <a href="https://www.linkedin.com/in/ayushi-dubey-57aa5a2b0" target="_blank" rel="noopener noreferrer">
                                        <FaLinkedin className='hover:text-purple-400 duration-300' size={24} />
                                    </a>
                                    <a href="https://twitter.com/AyushiDube52654" target="_blank" rel="noopener noreferrer">
                                        <FaXTwitter className='hover:text-purple-400 duration-300' size={24} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col items-center'>
                            <h3 className='text-lg font-semibold mb-2'>Copyright &#169; HustleLearn</h3>
                            <ul className='space-y-2 text-gray-400'>
                                <li>Terms & Conditions</li>
                                <li>Privacy</li>
                                <li>Result and Cancellation</li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default Home;