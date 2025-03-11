import React from 'react'
import { motion } from 'framer-motion'
import { ROLE, STATUS } from '../../../../utils/constants'
import { formattedFullDate } from '../../../../utils/dateFormatter'

export const ShowUserDetails = ({user, showUserDetails, setShowUserDetails}) => {
  return (
    <div className="min-h-screen p-6">
      <motion.div
        className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-md p-3 py-6 md:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header Row */}
        <div className="w-full flex items-center justify-between mb-6">
          {/* <div className="flex items-center gap-3"> */}
            <h1 className="text-2xl font-bold text-[#1C398E]">User Details</h1>
          {/* </div> */}
          <button
            onClick={() => setShowUserDetails(!showUserDetails)}
            className="bg-[#1C398E] text-white px-4 py-2 rounded-md hover:bg-[#142A6E] transition"
          >
            Edit
          </button>
        </div>

        {/* User Info Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-2 py-4">
            <div className="flex items-start gap-3">
                <p className="text-gray-600 font-medium">Name: </p>
                <p className="text-gray-800">{user?.name}</p>
            </div>
            <div className="flex items-start gap-3">
                <p className="text-gray-600 font-medium">Email: </p>
                <p className="text-gray-800">{user?.email}</p>
            </div>
            <div className="flex items-start gap-3">
                <p className="text-gray-600 font-medium">Phone No: </p>
                <p className="text-gray-800">{user?.phoneNo}</p>
            </div>
            {
                user?.role === ROLE.EMPLOYEE && user?.team &&
                <div className="flex items-start gap-3">
                    <p className="text-gray-600 font-medium">Team: </p>
                    <p className="text-gray-800">{user?.team?.teamName}</p>
                </div>
            }    
            {
                user?.teamLeader?.teamName &&
                <div className="flex items-start gap-3">
                    <p className="text-gray-600 font-medium">Leader of Team: </p>
                    <p className="text-gray-800">{user?.teamLeader?.teamName}</p>
                </div>
            }    
        </div>

        {/* Tasks Table */}
        {user?.tasks && user?.tasks?.length > 0 && (
          <div className="w-full py-4 flex flex-col gap-3">
            <p className="text-lg font-bold text-[#1C398E]">Tasks Assigned:</p>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200">
                <thead className="bg-[#1C398E] text-white">
                  <tr>
                    <th className="p-2 border">Task Name</th>
                    <th className="p-2 border">Description</th>
                    <th className="p-2 border">Deadline</th>
                    <th className="p-2 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {user?.tasks?.map((ts, id) => (
                    <motion.tr
                      key={id}
                      className="text-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: id * 0.1 }}
                    >
                      <td className="p-2 border">{ts?.name}</td>
                      <td className="p-2 border">{ts?.description}</td>
                      <td className="p-2 border">{formattedFullDate(ts?.deadline)}</td>
                      <td className="p-2 border">
                        <p className={`p-1 rounded-full text-sm font-bold text-white ${
                            ts?.status === STATUS.COMPLETED ? "bg-green-500" : "bg-red-500"
                          }`}>{ts?.status}</p>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
