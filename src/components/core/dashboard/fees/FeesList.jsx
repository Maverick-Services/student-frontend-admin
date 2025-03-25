import React from 'react'
import { motion } from 'framer-motion';
import { FEE_DETAILS } from '../../../../utils/constants';
import { useContext } from 'react';
import { AuthContext } from '../../../../Context/AuthContext';

function FeesList({setCurrentFeeDetails}) {
  const {  employees, teams } = useContext(AuthContext);

  const getStudent = (id)=>{
    const studentData = employees?.filter(cl => cl?._id === id)[0];
return studentData;
  }
    
  const getClass = (id) => {
    const classData = teams?.filter(cl => cl?._id === id)[0];
    // console.log(classData);
    return classData;
  }

//   console.log(FEE_DETAILS)

  return (
    <motion.div initial="hidden" animate="visible" className="w-full overflow-x-auto">
      <div>
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden ">
                <thead className="bg-blue-700 text-white">
                  <tr>
                  <th className="py-3 px-4 text-left font-medium ">Sno</th>
                  <th className="py-3 px-4 text-left font-medium">Name</th>
                    <th className="py-3 pl-2 pr-6 text-left font-medium">Class</th>
                    <th className="py-3 px-4 text-left font-medium">Batch</th>
                    <th className="py-3 px-4 text-left font-medium">Total Fee Amount</th>
                    <th className="py-3 px-4 text-left font-medium">Amount Paid</th>
                  </tr>
                </thead>
                <tbody>
                  {
                      FEE_DETAILS && FEE_DETAILS.map((item, index) => (
                          <tr
                              onClick={() => setCurrentFeeDetails(item)}
                              key={item?._id}
                              className="border-b last:border-0 transition-all duration-200 hover:bg-gray-100 even:bg-gray-50 cursor-pointer"
                          >
                              <td className="py-3 px-4 text-gray-600">{index + 1}</td>
                              <td className="py-3 px-4 text-gray-800">
                              <span to={"#"} className="hover:underline">
                                  {getStudent(item?.student)?.name}
                              </span>
                              </td>
                              <td className="py-2  text-gray-600">
                              <span className="p-2 py-1 text-sm font-semibold rounded-full bg-yellow-200">{getClass(item?.class)?.class_name}</span>
                              </td>
                              <td className="py-3 px-4 text-gray-600">{item?.batch}</td>
                              <td className="py-3 px-4 text-center text-gray-600">{item?.total_amount}</td>
                              <td className="py-3 px-4 text-center text-gray-600">{item?.paid}</td>
                          </tr>
                      ))
                  }
                </tbody>
              </table>
      </div>
    </motion.div>
  )
}

export default FeesList