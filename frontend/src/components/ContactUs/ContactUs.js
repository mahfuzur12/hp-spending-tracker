import React from 'react';
import "./ContactUs.css"

const ContactUs = () => {
    const mailtoLink = "mailto:hitgub.pocilot@gmail.com?subject=Contact%20Us&body=Please%20enter%20your%20questions%20or%20suggestions%20here.";

    return (
        <div className="contactus-container">
            <h1 className="contactus-title">Contact Us</h1>
            <p className="contactus-content">If you have any questions or suggestions, please click the link below to send us an email:</p>
            <a className="contactus-link" href={mailtoLink}>Send us an email</a>
        </div>
    );
};

export default ContactUs;
