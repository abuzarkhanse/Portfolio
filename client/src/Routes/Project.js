import React from 'react'

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Heroimg2 from '../components/Heroimg2';
import PricingCards from '../components/PricingCards';
import Work from '../components/Work';

const Project = () => {
  return (
    <div>
      <Navbar/>
      <Heroimg2 heading="PROJECTS." text="Some of my most recent Works"/>
      <Work/>
      <PricingCards/>
      <Footer/>
    </div>
  );
};

export default Project