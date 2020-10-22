/*
 * @Descripttion: 
 * @Author: voanit
 * @Date: 2020-08-28 17:15:46
 * @LastEditors: voanit
 * @LastEditTime: 2020-10-22 23:24:09
 */
import React from 'react'

import contactImg from '../Images/Contact/contact.jpg'

function ContactPage() {
	return (
		<div className="about">
			<img src={contactImg} className="aboutImg" alt="contact" />
			<div className="aboutSection">
				<h2 className="aboutTitle">Contact Us</h2>
				<div className="aboutTitleLine" />
				<form
					className="contactForm"
					target="view_window"
					action="https://formspree.io/f/mjvpweyp"
					method="POST"
				>
					<input className="contactForm1" type="text" name="fullname" placeholder="Full Name" required />
					<input className="contactForm1" type="email" name="email" placeholder="Email Address" required />
					<input className="contactForm1" type="text" name="title" placeholder="Email Title" required />
					<textarea className="contactForm2" name="message" placeholder="Message(Optional)" />
					<input className="contactButton" type="submit" name="submit" />
				</form>
			</div>
		</div>
	)
}

export default ContactPage
