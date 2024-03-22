import React from 'react';
import './App.css';
import Section from './components/section';
import BigSection from './components/bigsection';


function About() {
  return (
    <div className='content'>
      <BigSection
        subtitle="About Us"
        description={
          <p>
            Innfinity offers endless options of hotels in North America. 
            We collaborate with five well-known hotel chains, providing 
            customers with real-time room availability and easy booking 
            experiences. <a href='hotels'>Explore our vast selection of hotels</a> across 
            14 different locations in North America.
          </p>
        }
      />
      <Section
        subtitle="Our Mission"
        description={
          <p>
            At Innfinity, our mission is to redefine the way people experience travel. 
            We strive to provide our customers with unparalleled convenience, choice, 
            and satisfaction when it comes to booking accommodations worldwide. Through innovative technology and exceptional service, we aim to make 
            travel planning effortless and enjoyable for everyone. Whether it's for 
            business or leisure, we want every journey to be memorable and hassle-free.
          </p>
        }
      />
      <Section
        subtitle="Our Values"
        description={
          <ul>
            <li><strong>Customer Satisfaction:</strong> We prioritize the needs and satisfaction of our customers above all else.</li>
            <li><strong>Innovation:</strong> We continuously seek innovative solutions to enhance the travel experience for our customers.</li>
            <li><strong>Integrity:</strong> We uphold the highest standards of integrity and professionalism in all our interactions.</li>
            <li><strong>Collaboration:</strong> We believe in the power of collaboration and partnerships to deliver exceptional service.</li>
            <li><strong>Community:</strong> We are committed to giving back to the communities we serve and making a positive impact.</li>
          </ul>
        }
      />
    </div>
  );
}

export default About;