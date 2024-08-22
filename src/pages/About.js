import React from 'react';
import '../styles/home.css';

function About() {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to the Traffic Violation Management System. Our system is designed to facilitate efficient traffic law enforcement and violation management by the police department. The system aims to streamline the process of issuing traffic violation invoices to violators and maintaining accurate records of violations and payments.
      </p>
      <h2>Our Mission</h2>
      <p>
        Our mission is to enhance road safety and ensure compliance with traffic laws through innovative technology solutions. By providing a user-friendly interface for traffic police officers, we aim to make the process of managing traffic violations more efficient and effective.
      </p>
      <h2>Key Features</h2>
      <ul>
        <li><strong>User Management:</strong> Efficiently manage user profiles and access levels.</li>
        <li><strong>Violation Records:</strong> Maintain accurate records of all traffic violations.</li>
        <li><strong>Violation Invoices:</strong> Streamline the process of issuing and tracking violation invoices.</li>
        <li><strong>Payment Tracking:</strong> Monitor and record payments for traffic violations.</li>
      </ul>
      <h2>Benefits</h2>
      <ul>
        <li>Improved efficiency in traffic law enforcement.</li>
        <li>Accurate and up-to-date records of violations and payments.</li>
        <li>Enhanced ability to track and manage traffic violations.</li>
        <li>Better resource allocation for traffic management.</li>
        <li>Increased compliance with traffic laws.</li>
      </ul>
      <h2>Future Plans</h2>
      <p>
        We are continuously working on improving our system by integrating new technologies and features. Our future plans include the implementation of real-time traffic monitoring, predictive analytics for traffic management, and enhanced user interfaces for better usability.
      </p>
    </div>
  );
}

export default About;
