import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CLASSES, STATUS } from "../../../utils/constants";
import { AuthContext } from "../../../Context/AuthContext";
import { fetchAllTeams } from "../../../services/operations/teamAPI";
import { Spinner } from "../../common/Spinner";
import LayoutProvider from "../../common/LayoutProvider";

const Teams = () => {
  const { token, loading, setLoading, teams, setTeams } = useContext(AuthContext);
  // const [] = useState(CLASSES);

  const fetchTeams = async () => {
    setLoading(true);
    const result = await fetchAllTeams(token);
    if (result) {
      setTeams(result);
    }
    setLoading(false);
  };

  useEffect(() => {
    // fetchTeams();

    // eslint-disable-next-line
  }, []);

  if (loading || !teams) return <Spinner />;

  return (
    <LayoutProvider heading={"Manage Classes"}>
      <div className=" bg-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col justify-center gap-6">
          {/* Page Heading */}
          <div className="flex w-full justify-between items-center">
            <h1 className="text-2xl font-semibold text-[#1C398E]">All Classes</h1>
            <div className="flex w-fit gap-3 items-center">
              <Link to={'/dashboard/addClass'} 
                className="bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-full hover:scale-[0.96] transition cursor-pointer">
                <span>Create Class</span>
              </Link>
              <p className="text-blue-900 font-semibold">Total: {teams?.length}</p>
            </div>
          </div>
          {/* Teams Grid */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
          >
            {teams && teams.length === 0 ? (
              <p className="text-center text-gray-500 text-lg col-span-full">
                No Classes created yet
              </p>
            ) : (
              teams.map((cl, index) => (
                <motion.div
                  key={cl?._id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                  whileHover={{
                    scale: 1.03, // Reduced scale effect
                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)", // Softer hover shadow
                    transition: { duration: 0.3 },
                  }}
                  className="w-full h-auto flex flex-col"
                >
                  <Link
                    to={"#"}
                    // to={`/dashboard/class/${cl?._id}`}
                    className="w-full">
                    <div className="flex flex-col h-full bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-xl transition-all">
                      {/* Team Name */}
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {cl?.class_name}
                      </h3>
                      {/* Class Fees */}
                      {
                        // ts?.teamLeader &&
                        (
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">Monthly Fee:</span>{" "}
                          {cl?.fee}
                        </p>
                      )}
                      {/* Total Students */}
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Total Students:</span>{" "}
                        {cl?.students?.length || 0}
                      </p>
                      {/* Total Teachers */}
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Total Teachers:</span>{" "}
                        {cl?.teachers?.length || 0}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </LayoutProvider>
  );
};

export default Teams;
