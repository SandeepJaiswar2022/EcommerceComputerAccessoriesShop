import { HiOutlineUserGroup } from 'react-icons/hi';
import { MdTrendingUp, MdVisibility, MdBarChart } from 'react-icons/md';
import TrendChart from '../Charts/TrendChart';
import PiChart from '../Charts/PiChart';
import Sidebar from '../Sidebar/Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Admin() {

    return (
        <>
            <ToastContainer autoClose={1000} />
            <div className="grid grid-cols-6 space-x-1 gap-4 p-4">
                {/* First Grid (1 column) */}
                <div className="col-span-1 bg-black">
                    <div className="text-white"><Sidebar /></div>
                </div>

                {/* Second Grid (3 columns) */}
                <div className="col-span-5 grid gap-4">
                    {/* First Row (4 columns) */}
                    <div className="grid grid-cols-4 space-x-3 bg-black">
                        <div className="flex space-x-20 p-4 bg-red-600 text-white">
                            <div className="flex flex-col">
                                <span className="text-xl">81000</span>
                                <span className="text-xs text-center">VISITS</span>
                            </div>
                            <div>
                                <HiOutlineUserGroup size={42} />
                            </div>
                        </div>
                        <div className="flex space-x-16 p-4 bg-yellow-500 text-white">
                            <div className="flex flex-col">
                                <span className="text-xl">46.41%</span>
                                <span className="text-xs text-center">BOUNCE RATE</span>
                            </div>
                            <div>
                                <MdTrendingUp size={42} />
                            </div>
                        </div>
                        <div className="flex space-x-16 p-4 bg-green-500 text-white">
                            <div className="flex flex-col">
                                <span className="text-xl">4,056,447</span>
                                <span className="text-xs text-center">PAGEVIEWS</span>
                            </div>
                            <div>
                                <MdVisibility size={42} />
                            </div>
                        </div>
                        <div className="flex space-x-16 p-4 bg-indigo-500 text-white">
                            <div className="flex flex-col">
                                <span className="text-xl">42.32%</span>
                                <span className="text-xs text-center">GROWTH RATE</span>
                            </div>
                            <div>
                                <MdBarChart size={42} />
                            </div>
                        </div>
                    </div>

                    {/* Second Row (3 columns) */}
                    <div className="grid grid-cols-8 bg-black space-x-12 pt-6">
                        <div className="col-span-5 pr-4 pt-10  bg-gray-900 text-white"><TrendChart /></div>
                        <div className="col-span-3  bg-gray-900 text-white"><PiChart /></div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Admin
