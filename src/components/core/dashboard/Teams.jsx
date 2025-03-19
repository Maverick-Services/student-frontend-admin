import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CLASSES, STATUS } from "../../../utils/constants";
import { AuthContext } from "../../../Context/AuthContext";
import { fetchAllTeams } from "../../../services/operations/teamAPI";
import { Spinner } from "../../common/Spinner";

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
    <div className="w-full min-h-screen p-6 bg-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col justify-center gap-6">
        {/* Page Heading */}
        <motion.h1
          className="text-3xl font-bold text-[#1C398E] mb-8 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          All Classes
        </motion.h1>

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
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Teams;
