import React from 'react'

import aboutImg from '../Images/About/about.jpg'

function AboutPage() {
	return (
		<div className="about">
			<img src={aboutImg} className="aboutImg" alt="about" />
			<div className="aboutSection">
				<h2 className="aboutTitle">About Us</h2>
				<div className="aboutTitleLine" />
				<p className="aboutInfo">
					Providing a safe environment for our customers and store team members will always be our highest
					priority at TECH ZONE. We also want to do our best during this challenging period to allow our
					customers to access service, advice and product when they need it. <br />
					<br /> Below you’ll find some information about how we’re managing things in a rapidly and
					frequently changing environment. We’ll share new information on this page as it comes to hand.{' '}
					<br />
					<br />Payment via debit, credit or approved finance cards, as well as gift cards through our payment
					terminals is the preferred way to make payment in our stores. However, we will still be accepting
					cash if that is the only way you can make payment.
				</p>
				<a href="http://www.google.com" target="view_window" className="aboutA">
					<div className="aboutButton">MORE INFO</div>
				</a>
			</div>
		</div>
	)
}

export default AboutPage
