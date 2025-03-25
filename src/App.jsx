import './App.css'
import Dashboard from './pages/Dashboard'
import { Route, Routes } from 'react-router-dom'
import { Profile } from './components/core/dashboard/Profile'
import Navbar from './components/Navbar'
import { EditUserDetails } from './components/core/dashboard/employee/EditUserDetails'
import { AddUser } from './components/core/dashboard/employee/AddUser'
import { AddAdmin } from './components/core/dashboard/admin/AddUser'
import { EditAdminDetails } from './components/core/dashboard/admin/EditUserDetails'
import { EditTeamDetails } from './components/core/dashboard/team/EditTeamDetails'
import { AddTeam } from './components/core/dashboard/team/AddTeam'
import { AdminLogin } from './pages/Login'
import Employees from './components/core/dashboard/Employees'
import Teams from './components/core/dashboard/Teams'
import OpenRoute from './components/core/auth/OpenRoute'
import PrivateRoute from './components/core/auth/PrivateRoute'
import { AddTeacher } from './components/core/dashboard/teacher/AddUser'
import { EditTeacherDetails } from './components/core/dashboard/teacher/EditUserDetails'
import Teachers from './components/core/dashboard/Teachers'
import Fees from './pages/Fees'

function App() {
  return (
    <div id='wrapper'  className='bg-gray-200'>
      {/* Admin  */}
      {/* <Navbar/> */}
      <Routes>
        <Route path='/' element={
          <OpenRoute>
            <AdminLogin/>
          </OpenRoute>
        } />
        <Route
          // path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        >
          <Route path='/dashboard' element={<Profile/>}/>
          {/* <Route path='/dashboard/addAdmin' element={<AddAdmin/>}/> */}
          {/* <Route path='/dashboard/editAdminDetails/:userId' element={<EditAdminDetails/>}/> */}
          <Route path='/dashboard/addStudent' element={<AddUser/>}/>
          <Route path='/dashboard/students/:empId' element={<EditUserDetails/>}/>
          <Route path='/dashboard/student' element={<Employees/>}/>
          <Route path='/dashboard/addTeacher' element={<AddTeacher/>}/>
          <Route path='/dashboard/teachers/:empId' element={<EditTeacherDetails/>}/>
          <Route path='/dashboard/teacher' element={<Teachers/>}/>
          <Route path='/dashboard/addClass' element={<AddTeam/>}/>
          <Route path='/dashboard/class/:teamId' element={<EditTeamDetails/>}/>
          <Route path='/dashboard/class' element={<Teams/>}/>
          <Route path='/dashboard/fees' element={<Fees/>}/>
          <Route
          path='*'
          element={<p>404 Error - Page Not Found</p>}
        />
        </Route>
        <Route
          path='*'
          element={<p>404 Error - Page Not Found</p>}
        />
      </Routes>
    </div>
  )
}

export default App
