import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Authentication/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home';

function App() {

  const [theme, setTheme] = useState(false);
  useEffect(() => {
    setTheme(JSON.parse(window.localStorage.getItem("theme")));
  }, []);
  const handleThemeChange = () => {
    setTheme(!theme);
    window.localStorage.setItem("theme", !theme);
  };

  return (
    <div data-theme={theme && "night"} className="bg-base-100">
      

      <Navbar handleThemeChange={handleThemeChange} theme={theme} />
      
      <h1>Hello Crave</h1>
      <h1 className="text-4xl font-bold underline">
      Hello world!
    </h1>

    <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route
          path="/task"
          element={
            <RequireAuth>
              <ManageTask />
            </RequireAuth>
          }
        /> */}
        
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster />

    </div>
  );
}

export default App;
