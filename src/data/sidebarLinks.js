export const sideBarLinks = [
    {
        name: "Profile",
        path: "/dashboard/profile"
    },
    // {
    //     name: "Create Admin",
    //     path: "/dashboard/addAdmin"
    // },
    {
        name: "Student",
        path: "/dashboard/addStudent",
        subtabs:[
            {
                name: "Add Student",
                path: "/dashboard/addStudent"
            },
            {
                name: "Modify Student",
                path: "/dashboard/student"
            },
        ]
    },
    {
        name: "Class",
        path: "/dashboard/addClass",
        subtabs:[
            {
                name: "Add Class",
                path: "/dashboard/addClass"
            },
            {
                name: "Modify Class",
                path: "/dashboard/class"
            },
        ]
    }
    // {
    //     name: "Logout"
    // }
]