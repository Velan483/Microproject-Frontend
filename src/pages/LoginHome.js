import React from 'react';
import { Carousel } from 'react-bootstrap';
import '../styles/home.css';
import About from './About';
import TrafficRules from './TrafficRules';
import ContactUs from './Contact';
import HeaderViolator from '../components/Header1';

function LoginHome() {
  return (
    
    <div id='home'>
        <HeaderViolator />
      <Carousel>
  <Carousel.Item>
    <img
      src="https://images.pexels.com/photos/14401419/pexels-photo-14401419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      alt="Traffic Management System"
      width={"100%"}
      height={600}
    />
    <Carousel.Caption>
      <h3>Teen Traffic Violation Penalties</h3>
      <p>Understanding the consequences of traffic violations for teens</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      src="https://images.pexels.com/photos/26690698/pexels-photo-26690698/free-photo-of-a-mercedes-benz-e-class-driving-on-the-street.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      alt="Intelligent Traffic Management"
      width={"100%"}
      height={600}
    />
    <Carousel.Caption>
      <h3>Driving Etiquette</h3>
      <p>Promoting courteous and safe driving practices</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      src="https://callsam.com/wp-content/uploads/2023/06/Cell-Phone-Use-While-Driving-800x400-1.png"
      alt="Traffic Management Solutions"
      width={"100%"}
      height={600}
    />
    <Carousel.Caption>
      <h3>Cognitive Distraction</h3>
      <p>Recognizing and mitigating distractions while driving</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      src="https://tpmblegal.com/wp-content/uploads/2022/11/1.jpg"
      alt="Traffic Management Technology"
      width={"100%"}
      height={600}
    />
    <Carousel.Caption>
      <h3>Wear Your Seatbelt</h3>
      <p>Always buckle up, and ensure that all passengers in your vehicle are wearing seatbelts.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      src="https://images.pexels.com/photos/3068900/pexels-photo-3068900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      alt="Smart Traffic Management"
      width={"100%"}
      height={600}
    />
    <Carousel.Caption>
      <h3>Obey Traffic Signals and Signs</h3>
      <p>Follow all traffic signals and road signs. They are there to ensure smooth and safe traffic flow.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

      <div id="about-us" className="section">
        <About />
      </div>
      <div id="traffic-rules" className="section">
        <TrafficRules/>
      </div>
      <div id="contact-us" className="section">
        <ContactUs/>
      </div>
      <br/>
      <br/>
      <div id='footer'>
         <footer className="footer-container">
      <div className="footer-content">
      <p>© 2024 Traffic Violation Management System. All rights reserved.</p>
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#about-us">About Us</a>
          <a href="#traffic-rules">Traffic Rules</a>
          <a href="#contact-us">Contact Us</a>
        </div>
      </div>
    </footer>
    </div>
    </div>
  );
}

export default LoginHome;



