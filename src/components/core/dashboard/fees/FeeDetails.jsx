import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// import { fetchAllEmployees } from "../../../services/operations/userAPI";
// import { Spinner } from "../../common/Spinner";
// import { ROUTES } from "../../../utils/constants";
import { CLASSES,  ROUTES } from "../../../../utils/constants";
import { formattedFullDate } from "../../../../utils/dateFormatter";

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FeeDetails = ({feeDetails, setCurrentFeeDetails}) => {
  // const [employees, setEmployees] = useState([]);

  // console.log(employees)
//   const fetchEmployees = async () => {
//     setLoading(true);
//     const result = await fetchAllEmployees(token);
//     if (result) {
//       setEmployees(result);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     // fetchEmployees();
//   }, []);

  const getClass = (id) => {
    const classData = CLASSES?.filter(cl => cl?._id === id)[0];
    // console.log(classData);
    return classData;
  }

  const getRoute = (route) => {
    const routeData = ROUTES?.filter(rt => rt?.route === route)[0];
    // console.log(classData);
    return routeData;
  }

//   if (loading || !employees) return <Spinner />;

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col gap-6">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-2xl font-semibold text-[#1C398E]">Fee Details</h1>
        <button
          className="bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-full hover:scale-[0.96] transition cursor-pointer"
          onClick={() => setCurrentFeeDetails(null)}
        >
          Back
        </button>
      </div>
      <div className="flex w-full flex-wrap gap-4 justify-between items-center p-4 bg-white">
          <p className="text-blue-900 font-semibold">
              Total Fee: {feeDetails?.total_amount}
          </p>
          <p className="text-blue-900 font-semibold">
              Paid: {feeDetails?.paid}
          </p>
          <p className="text-blue-900 font-semibold">
              Pending: {feeDetails?.pending}
          </p>
          <p className="text-blue-900 font-semibold">
              Total Installments: {feeDetails?.installments?.length}
          </p>
          <p className="text-blue-900 font-semibold">
              Paid: {
                  feeDetails?.installments?.filter(it => it?.payment_status === "Paid")?.length
              }
          </p>
          <p className="text-blue-900 font-semibold">
              Pending: {
                  feeDetails?.installments?.filter(it => it?.payment_status === "Pending")?.length
              }
          </p>
      </div>
      {/* <div className="flex w-full justify-between items-center"> */}
      {/* </div> */}
      <motion.div initial="hidden" animate="visible" className="w-full overflow-x-auto">
        <h1 className="text-xl pb-4 font-semibold text-[#1C398E]">Installments</h1>
        {feeDetails?.installments && feeDetails?.installments.length === 0 ? (
          <motion.p
            variants={cardVariants}
            className="text-gray-600 text-lg text-center py-8"
          >
            No Installments yet
          </motion.p>
        ) : (
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden ">
            <thead className="bg-blue-700 text-white">
              <tr>
                  <th className="py-3 px-4 text-left font-medium ">Sno</th>
                  <th className="py-3 px-4 text-left font-medium">Batch</th>
                  <th className="py-3 pl-2 pr-6 text-left font-medium">Class</th>
                  <th className="py-3 px-4 text-left font-medium">Receipt Number</th>
                  <th className="py-3 px-4 font-medium">Amount</th>
                  <th className="py-3 px-4 text-center font-medium">Installment Date</th>
                  <th className="py-3 px-4 text-center font-medium">Payment Status</th>
                  <th className="py-3 px-4 text-left font-medium">Paid On</th>
              </tr>
            </thead>
            <tbody>
              {feeDetails?.installments?.map((fee, index) => (
                <motion.tr
                  key={index}
                  variants={cardVariants}
                  whileTap={{ scale: 0.98 }}
                  className="border-b last:border-0 transition-all duration-200 hover:bg-gray-100 even:bg-gray-50"
                >
                  <td className="py-3 px-4 text-gray-600">{index + 1}</td>
                  <td className="py-3 px-4 text-gray-800">
                    <Link to={"#"} className="hover:underline">
                      {feeDetails?.batch}
                    </Link>
                  </td>
                  <td className="py-2  text-gray-600">
                    <span className="p-2 py-1 text-sm font-semibold rounded-full bg-yellow-200">{getClass(feeDetails?.class)?.class_name}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{fee?.receipt_number || "-"}</td>
                  <td className="py-3 px-4 text-gray-600 text-center">{fee?.amount}</td>
                  <td className="py-3 px-4 text-gray-600 text-center">{formattedFullDate(fee?.due_date)}</td>
                  <td className="py-3 px-4 text-gray-600 text-center">{fee?.payment_status}</td>
                  <td className="py-3 px-4 text-gray-600">{
                      fee?.paid_on ? formattedFullDate(fee?.paid_on) : "Yet to be Paid"
                  }</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>

    </div>
  );
};

export default FeeDetails;
