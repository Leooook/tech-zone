import React from 'react'

import Hero from '../Components/hero'
import Services from '../Components/services'

function MainPage() {
	return (
		<div>
			<Hero title="Amazing Products" path="/products" banner="Our Products" />
			<Services />
		</div>
	)
}

export default MainPage
