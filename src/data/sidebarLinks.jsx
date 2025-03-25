// import { IoHome } from "react-icons/io5";
// import { PiStudentDuotone } from "react-icons/pi";
// import { FaUser } from "react-icons/fa";
// import { GiTeacher } from "react-icons/gi";


// export const sideBarLinks = [
//     {
//         name: "Home",
//         path: "/dashboard/profile",
//         icon: <IoHome />
//     },
//     {
//         name: "Student",
//         path: "/dashboard/student",
//         icon: <PiStudentDuotone  />
//         // subtabs:[
//         //     {
//         //         name: "All Students",
//         //         path: "/dashboard/student"
//         //     },
//         //     {
//         //         name: "Add Student",
//         //         path: "/dashboard/addStudent"
//         //     },
//         // ]
//     },
//     {
//         name: "Teacher",
//         path: "/dashboard/teacher",
//         icon: <FaUser />
//         // subtabs:[
//         //     {
//         //         name: "All Teachers",
//         //         path: "/dashboard/teacher"
//         //     },
//         //     {
//         //         name: "Add Teacher",
//         //         path: "/dashboard/addTeacher"
//         //     },
//         // ]
//     },
//     {
//         name: "Class",
//         path: "/dashboard/class",
//         icon: <GiTeacher  />
//         // subtabs:[
//         //     {
//         //         name: "All Class",
//         //         path: "/dashboard/class"
//         //     },
//         //     {
//         //         name: "Add Class",
//         //         path: "/dashboard/addClass"
//         //     },
//         // ]
//     }
//     // {
//     //     name: "Logout"
//     // }
// ]


import { IoHome } from "react-icons/io5";
import { PiStudentDuotone } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { BsCashCoin } from "react-icons/bs";


export const sideBarLinks = [
    {
        name: "Home",
        path: "/dashboard",
        icon: IoHome
    },
    {
        name: "Student",
        path: "/dashboard/student",
        icon: PiStudentDuotone
    },
    {
        name: "Teacher",
        path: "/dashboard/teacher",
        icon: FaUser
    },
    {
        name: "Class",
        path: "/dashboard/class",
        icon: GiTeacher
    },
    {
        name: "Fees",
        path: "/dashboard/fees",
        icon: BsCashCoin
    },
];
