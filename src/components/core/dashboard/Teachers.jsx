import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../../Context/AuthContext";
import { fetchAllEmployees } from "../../../services/operations/userAPI";
import { Spinner } from "../../common/Spinner";
import LayoutProvider from "../../common/LayoutProvider";

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Teachers = () => {
  const { token, loading, setLoading, teachers, teams } = useContext(AuthContext);
  // const [employees, setEmployees] = useState([]);

  // const fetchEmployees = async () => {
  //   setLoading(true);
  //   const result = await fetchAllEmployees(token);
  //   if (result) {
  //     setEmployees(result);
  //   }
  //   setLoading(false);
  // };

  useEffect(() => {
    // fetchEmployees();
  }, []);

  const getClass = (id) => {
    const classData = teams?.filter(cl => cl?._id === id)[0];
    // console.log(classData);
    return classData;
  }

  if (loading || !teachers) return <Spinner />;

  return (
    <LayoutProvider heading={"Manage Teachers"}>
      <div className="w-full min-h-screen bg-gray-100 flex flex-col gap-3">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-2xl font-semibold text-[#1C398E]">All Teachers</h1>
          <div className="flex w-fit gap-3 items-center">
            <Link to={'/dashboard/addTeacher'} 
              className="bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-full hover:scale-[0.96] transition cursor-pointer">
              <span>Add Teacher</span>
            </Link>
            <p className="text-blue-900 font-semibold">Total: {teachers?.length}</p>
          </div>
        </div>

        <motion.div initial="hidden" animate="visible" className="w-full overflow-x-auto">
          {teachers && teachers.length === 0 ? (
            <motion.p
              variants={cardVariants}
              className="text-gray-600 text-lg text-center py-8"
            >
              No Teachers added yet
            </motion.p>
          ) : (
            <table className="min-w-full bg-white shadow-md border rounded-lg overflow-hidden">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="py-3 px-4 text-left font-medium">Sno</th>
                  <th className="py-3 px-4 text-left font-medium">Name</th>
                  <th className="py-3 px-4 text-left font-medium">Email</th>
                  <th className="py-3 px-4 text-left font-medium">Mobile No</th>
                  <th className="py-3 px-4 font-medium text-center">Subject</th>
                  <th className="py-3 px-4 text-left font-medium">Class</th>
                </tr>
              </thead>
              <tbody>
                {teachers?.map((teacher, index) => (
                  <motion.tr
                    key={index}
                    variants={cardVariants}
                    whileTap={{ scale: 0.98 }}
                    className="border-b last:border-0 transition-all duration-200 hover:bg-gray-100 even:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-gray-600">{index + 1}</td>
                    <td className="py-3 px-4 text-gray-800">
                      <Link to={"#"} className="hover:underline">
                        {teacher?.name}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{teacher?.email}</td>
                    <td className="py-3 px-4 text-gray-600">{teacher?.phoneNumber}</td>
                    <td className="py-3 px-4 text-gray-600 text-center">
                    <span className="p-2 py-1 text-sm font-semibold rounded-full bg-green-200">
                        {teacher?.subject}
                        {/* {getClass(teacher?.class)?.class_name} */}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      <span className="p-2 py-1 text-sm font-semibold rounded-full bg-yellow-200">
                        {getClass(teacher?.class)?.class_name}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </motion.div>

      </div>
    </LayoutProvider>
  );
};

export default Teachers;
