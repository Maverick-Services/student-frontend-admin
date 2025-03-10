import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { STATUS } from "../../../utils/constants";
import { AuthContext } from "../../../Context/AuthContext";
import { fetchAllTeams } from "../../../services/operations/teamAPI";
import { Spinner } from "../../common/Spinner";

const Teams = () => {
  const { token, loading, setLoading } = useContext(AuthContext);
  const [teams, setTeams] = useState([]);

  const fetchTeams = async () => {
    setLoading(true);
    const result = await fetchAllTeams(token);
    if (result) {
      setTeams(result);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTeams();
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
          transition={{ duration: 0.1 }}
        >
          All Teams
        </motion.h1>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full h-full">
          {teams && teams.length === 0 ? (
            <p className="text-center text-gray-500 text-lg col-span-full">
              No Teams created yet
            </p>
          ) : (
            teams.map((ts, index) => (
              <Link key={ts?._id} to={`/dashboard/teams/${ts?._id}`} className="w-full h-full">
                {/* Animated Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.05, delay: index * 0.1 }}
                  className="flex flex-col h-full bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-md transition duration-300"
                >
                  {/* Team Name */}
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {ts?.teamName}
                  </h3>

                  {/* Team Leader */}
                  {ts?.teamLeader && (
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Team Leader:</span>{" "}
                      {ts?.teamLeader?.name}
                    </p>
                  )}

                  {/* Team Members */}
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Team Members:</span>{" "}
                    {ts?.members?.length || 0}
                  </p>

                  {/* Total Tasks */}
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Total Tasks:</span>{" "}
                    {ts?.tasks?.length || 0}
                  </p>

                  {/* Tasks Completed */}
                  <p className="text-sm text-gray-600 mt-auto">
                    <span className="font-medium">Tasks Completed:</span>{" "}
                    {ts?.tasks?.filter((t) => t?.status === STATUS.COMPLETED).length || 0}
                  </p>
                </motion.div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Teams;
