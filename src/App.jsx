import React, { useContext, useEffect, useState } from 'react';
import Login from './components/Auth/Login';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import { AuthContext } from './context/AuthProvider';

const App = () => {
  const [user, setUser] = useState(null);  // Role (admin or employee)
  const [loggedInUserData, setLoggedInUserData] = useState(null);  // Logged in user data
  const [userData] = useContext(AuthContext);  // Fetch userData from context

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    
    if (loggedInUser) {
      const parsedUserData = JSON.parse(loggedInUser);
      setUser(parsedUserData.role);
      setLoggedInUserData(parsedUserData.data);
    }
  }, []);

  const handleLogin = (email, password) => {
    console.log("userData:", userData);  // Debugging: Log userData to check its structure

    // Check if userData exists and has employees/admin keys
    if (userData) {
      if (Array.isArray(userData.employees)) {
        const employee = userData.employees.find((e) => email === e.email && e.password === password);
        if (employee) {
          setUser('employee');
          setLoggedInUserData(employee);
          localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: employee }));
          return;
        }
      }

      // If employee credentials didn't match, check for admin
      if (Array.isArray(userData.admin)) {
        const admin = userData.admin.find((e) => email === e.email && e.password === password);
        if (admin) {
          setUser('admin');
          setLoggedInUserData(admin);
          localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin', data: admin }));
          return;
        }
      }
    }

    alert("Invalid Credentials");
  };

  return (
    <>
      {!user ? <Login handleLogin={handleLogin} /> : ''}
      {user === 'admin' ? (
        <AdminDashboard changeUser={setUser} data={loggedInUserData} />
      ) : user === 'employee' ? (
        <EmployeeDashboard changeUser={setUser} data={loggedInUserData} />
      ) : null}
    </>
  );
};

export default App;
