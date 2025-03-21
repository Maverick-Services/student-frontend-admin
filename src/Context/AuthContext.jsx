import { createContext, useEffect, useState } from "react";
import {  users } from "../data/dummy";
import { CLASSES, STUDENTS, TEACHERS } from "../utils/constants";

export const AuthContext = createContext();

function AuthContextProvider({children}){

    const [admin, setAdmin] = useState(
        localStorage?.getItem("user") ? JSON.parse(localStorage?.getItem("user")) : null
    )
    const [employees, setEmployees] = useState(
        localStorage?.getItem("students") ? JSON.parse(localStorage?.getItem("students")) : STUDENTS
    );
    const [teams, setTeams] = useState(
        localStorage?.getItem("classes") ? JSON.parse(localStorage?.getItem("classes")) : CLASSES
    );
    const [teachers, setTeachers] = useState(
        localStorage?.getItem("teachers") ? JSON.parse(localStorage?.getItem("teachers")) : TEACHERS
    );
    const [team, setTeam] = useState(null);
    const [editTeam, setEditTeam] = useState(false);
    const [user, setUser] = useState(null);
    const [editUser, setEditUser] = useState(false);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(
        localStorage?.getItem("token") ? localStorage?.getItem("token") : null
    )

    useEffect(()=>{
        token && localStorage.setItem("token",token);
        // setToken(localStorage.getItem("token"));
    },[token]);
    
    useEffect(()=>{
        admin && localStorage.setItem("user",JSON.stringify(admin));
        // setTeam(JSON.parse(localStorage.getItem("team")));
    },[admin]);

    useEffect(()=>{
        employees && localStorage.setItem("students",JSON.stringify(employees));
        // setTeam(JSON.parse(localStorage.getItem("team")));
    },[employees]);

    useEffect(()=>{
        teachers && localStorage.setItem("teachers",JSON.stringify(teachers));
        // setTeam(JSON.parse(localStorage.getItem("team")));
    },[teachers]);

    useEffect(()=>{
        teams && localStorage.setItem("classes",JSON.stringify(teams));
        // console.log(JSON.parse(localStorage.getItem("classes")))
        // setTeam(JSON.parse(localStorage.getItem("team")));
    },[teams]);

    let values = {
        admin, setAdmin,
        employees, setEmployees,
        teachers,setTeachers,
        teams, setTeams,
        team, setTeam,
        editTeam, setEditTeam,
        user, setUser,
        editUser, setEditUser,
        loading, setLoading,
        token, setToken
    }

    return <AuthContext.Provider value={values}>
        {children}
    </AuthContext.Provider>
}

export default AuthContextProvider;