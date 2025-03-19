import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../../Context/AuthContext";
import student from "../../../assets/students.png"
import teacher from "../../../assets/teachers.png"
import classes from "../../../assets/classes.png"
import fee from "../../../assets/fee.png"

export const Profile = () => {

  const {admin} = useContext(AuthContext);
  // console.log(admin)

  return (
    <div className="w-full h-full flex lg:items-center justify-center">
      <motion.div
        className="w-full h-full flex flex-col gap-4 items-start"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      > 
        {/* Profile Header */}
        <motion.h1
          className="text-3xl font-bold sm:font-bold text-[#1C398E] pb-2 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          Welcome {admin?.name}👋
        </motion.h1>

        {/* Profile Details */}
        <div className="space-y-4 w-full py-4 flex justify-between flex-wrap">
          <ProfileItem label="Total Students" value={450} img={student} />
          <ProfileItem label="Total Teachers" value={40} img={teacher} />
          <ProfileItem label="Total Classes" value={30} img={classes} />
          <ProfileItem label="Students Fee Paid" value={400} img={fee} />
          <ProfileItem label="Students Fee Remaining" value={50} img={fee} />
        </div>

        {/* Notice Board */}
        <motion.div
          className="w-full h-full min-h-[200px] flex flex-col p-4 bg-white shadow-sm items-center justify-center gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          No Notifications Yet
        </motion.div>
      </motion.div>
    </div>
  );
};

// Profile Item Component
const ProfileItem = ({ label, value, img }) => {
  return (
    <motion.div
      className="flex flex-col gap-2 justify-between sm:items-center shadow-sm bg-white p-4 px-6 rounded-lg hover:bg-gray-50 transition border border-gray-50 cursor-pointer"
      whileHover={{ scale: 1.02 }}
    >
      <img src={img} />
      <h3 className="text-lg font-semibold text-[#374151]">{label}</h3>
      <p className="text-lg text-gray-900 font-medium">{value}</p>
    </motion.div>
  );
};

// export default Profile;
