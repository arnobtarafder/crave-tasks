import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';



const NotFound = () => {
  const navigate = useNavigate();


  return (
    <div className='NotFound-container mx-auto h-screen pt-24'>

      <div id="background"></div>
      <div className="NotFound-Top">
        <h1 className="NotFound-Header">404</h1>
        <h3 className='NotFound-Text'>page not found</h3>
      </div>
      <div className="NotFound-Container">
        <div className="ghost-copy">
          <div className="one"></div>
          <div className="two"></div>
          <div className="three"></div>
          <div className="four"></div>
        </div>
        <div className="ghost">
          <div className="face">
            <div className="eye"></div>
            <div className="eye-right"></div>
            <div className="mouth"></div>
          </div>
        </div>
        <div className="NotFound-Shadow"></div>
      </div>
      <div className="NotFound-Bottom">
        <p className='NotFound-Paragraph'>Boo, looks like a ghost stole this page!</p>

        <div className="NotFound-Buttons">
          <button className="NotFound-Button" onClick={() => navigate(-1)}>Back</button>
        
          <button onClick={() => navigate("/home")} className='NotFound-Button'>home <i className="far fa-hand-point-right"></i></button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;