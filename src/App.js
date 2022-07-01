import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Authentication/Login/Login';
import Registration from './Components/Authentication/Registration/Registration';
import RequireAuth from './Components/Authentication/RequireAuth/RequireAuth';
import ResetPassword from './Components/Authentication/ResetPassword/ResetPassword';
import Calendar from './Components/Calendar/Calendar';
import CompletedTask from './Components/CompletedTask/CompletedTask';
import Footer from './Components/General/Footer/Footer';
import Navbar from './Components/General/Navbar/Navbar';
import ManageTask from './Components/ManageTask/ManageTask';
import NotFound from './Components/NotFound/NotFound';
import Profile from './Components/Profile/Profile';
import Home from './Pages/Home';

function App() {
  const [theme, setTheme] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(false);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    setTheme(JSON.parse(window.localStorage.getItem("theme")));
  }, []);

  const handleThemeChange = () => {
    setTheme(!theme);
    window.localStorage.setItem("theme", !theme);
  };

  return (
    <div data-theme={theme && "night"} className="bg-base-100">


      {loading ? (
        <div id="preloader">
          <div id="loader"></div>
        </div>
      ) : (
        <Navbar handleThemeChange={handleThemeChange} theme={theme} />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route
          path="/task"
          element={
            <RequireAuth>
              <ManageTask />
            </RequireAuth>
          }
        />
        <Route
          path="/completed"
          element={
            <RequireAuth>
              <CompletedTask />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />

        <Route path="/calendar" element={<Calendar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <Footer />
      <Toaster />

    </div>
  );
}

export default App;
