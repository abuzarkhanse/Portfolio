import { Link } from "react-router-dom";
import React from 'react';
import "./AboutContentStyles.css";
// import React1 from "../assets/BackImg.jpg";
import React1 from "../assets/MicAb2.jpg";
import React2 from "../assets/ab1.jpg";

const AboutContent = () => {
  return (
    <div className="about">
      <div className="left">
  <h1>Who I am?</h1>
  <p>
    I'm a passionate Software Engineering student, currently pursuing my degree at the renowned Pak-Austria Fachhochschule Institute of Applied Science and Technology.
  </p>
  <p>
    My academic journey commenced with a strong foundation in programming, starting with a deep dive into the intricacies of C++ during my first semester. In my second semester, I further expanded my knowledge by mastering the principles of Object-Oriented Programming (OOP). In my third semester, I successfully completed Data Structures and Algorithms (DSA) in C++, further enhancing my programming proficiency.
  </p>
  <p>
    My interest in web development led me to explore a variety of tools and languages, such as HTML, CSS, JavaScript, and React.js, Node.js, PHP, MySQL, Git and Github. I have successfully applied these skills in multiple web development projects during my internships.
  </p>
  <p>
    I kick-started my professional journey with an internship at Sabzland, followed by a remote web development internship at Oasis Infobyte. These experiences allowed me to develop hands-on skills in creating user-friendly, responsive websites. I further honed my skills during my recent internship at Entechin, where I contributed to both web and software development projects using HTML, CSS, JavaScript, and C++.
  </p>
  <p>
    Beyond technical skills, I am committed to continuous learning and staying at the forefront of the ever-evolving software engineering landscape. I am excited to contribute to the tech industry, leveraging my expertise in web development and software solutions.
  </p>
  <Link to="/contact">
    <button className="btn">Contact</button>
  </Link>
</div>


      <div className="right">
        <div className="img-container">
          <div className="img-stack top">
            <img src={React1} className="img" alt="true" />
          </div>

          <div className="img-stack bottom">
            <img src={React2} className="img" alt="true" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
