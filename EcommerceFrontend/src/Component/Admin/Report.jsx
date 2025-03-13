import React from "react";
import Sidebar from "../Sidebar/Sidebar";

const Report = () => {
    return (
        <>
            {/* <ToastContainer autoClose={1000} /> */}

            <div className="grid grid-cols-6 space-x-1 gap-4 p-4">
                {/* First Grid (1 column) */}
                <div className="col-span-1 bg-black">
                    <div className="text-white"><Sidebar /></div>
                </div>

                {/* Second Grid (3 columns) */}
                <div className="col-span-5 text-white text-center grid gap-4">
                    <p className="font-extrabold text-2xl">Report</p>
                </div>
            </div>
        </>
    );
};

export default Report;
