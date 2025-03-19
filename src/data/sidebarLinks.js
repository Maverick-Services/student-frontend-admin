export const sideBarLinks = [
    {
        name: "Home",
        path: "/dashboard/profile"
    },
    {
        name: "Student",
        path: "/dashboard/student",
        subtabs:[
            {
                name: "All Students",
                path: "/dashboard/student"
            },
            {
                name: "Add Student",
                path: "/dashboard/addStudent"
            },
        ]
    },
    {
        name: "Teacher",
        path: "/dashboard/teacher",
        subtabs:[
            {
                name: "All Teachers",
                path: "/dashboard/teacher"
            },
            {
                name: "Add Teacher",
                path: "/dashboard/addTeacher"
            },
        ]
    },
    {
        name: "Class",
        path: "/dashboard/class",
        subtabs:[
            {
                name: "All Class",
                path: "/dashboard/class"
            },
            {
                name: "Add Class",
                path: "/dashboard/addClass"
            },
        ]
    }
    // {
    //     name: "Logout"
    // }
]