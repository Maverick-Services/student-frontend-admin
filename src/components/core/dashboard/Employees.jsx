import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../../Context/AuthContext";
import { fetchAllEmployees } from "../../../services/operations/userAPI";
import { Spinner } from "../../common/Spinner";
import { ROUTES } from "../../../utils/constants";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Employees = () => {
  const { token, loading, setLoading, employees, setEmployees, teams } = useContext(AuthContext);
  // const [employees, setEmployees] = useState([]);

  // console.log(employees)
  const fetchEmployees = async () => {
    setLoading(true);
    const result = await fetchAllEmployees(token);
    if (result) {
      setEmployees(result);
    }
    setLoading(false);
  };

  useEffect(() => {
    // fetchEmployees();
  }, []);

  const getClass = (id)=>{
    const classData = teams?.filter(cl => cl?._id === id)[0];
    // console.log(classData);
    return classData;
  }

  const getRoute = (route)=>{
    const routeData = ROUTES?.filter(rt => rt?.route === route)[0];
    // console.log(classData);
    return routeData;
  }

  if (loading || !employees) return <Spinner />;

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100 flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-[#1C398E]">All Students</h1>

      <motion.div
        initial="hidden"
        animate="visible"
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
      >
        {employees && employees.length === 0 ? (
          <motion.p
            variants={cardVariants}
            className="text-gray-600 text-lg text-center col-span-full"
          >
            No Students added yet
          </motion.p>
        ) : (
          employees?.map((st) => (
            <motion.div
              key={st?._id}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full max-w-[350px] flex-1 flex justify-center"
            >
              <Link
                to={"#"} 
                // to={`/dashboard/students/${st?._id}`} 
                className="w-full">
                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col gap-2 transition-all hover:shadow-xl min-h-[280px] xl:min-h-[230px] h-auto">
                  <h3 className="text-lg font-semibold text-gray-800 break-words whitespace-normal">
                    Name: {st?.name}
                  </h3>
                  <p className="text-gray-600">{getClass(st?.class)?.class_name}</p>
                  <p className="text-gray-600 break-words whitespace-normal">
                    Father: {st?.fatherName}
                  </p>
                  <p className="text-gray-600 break-words whitespace-normal">
                    Mother: {st?.motherName}
                  </p>
                  <p className="text-gray-600 break-words whitespace-normal">
                    {st?.email}
                  </p>
                  <p className="text-gray-600">Mobile No: {st?.phoneNumber}</p>
                  <p className="text-gray-600">Route: {getRoute(st?.route)?.route}</p>
                  {/* <p className="text-gray-600">
                    Tasks Assigned:{" "}
                    <span className="font-semibold text-[#1C398E]">
                      {em?.tasks?.length}
                    </span>
                  </p> */}
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default Employees;
