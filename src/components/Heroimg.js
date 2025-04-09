import "./HeroimgStyle.css";
import React from 'react'
import Introimg from "../assets/UniPic.png"
import { Link } from "react-router-dom";



const Heroimg = () => {
  return (
    <div className="hero">
        <div className="mask">
            <img className="into-img" src={Introimg} alt="Introimg"/>
        </div>
        <div className="content">
            <p>Hi, I'M Abuzar Khan</p>
            <h3 className="type1"> Software Engineering Student</h3>
            <h3 className="type2"> Web Developer</h3>
            <div className="herobtn">
                <Link to="/Project" className="btn">Project</Link>
                <Link to="/Contact" className="btn btn-light">Contact</Link>
            </div>
        </div>
    </div>
  )
}

export default Heroimg