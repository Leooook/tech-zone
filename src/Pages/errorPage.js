import React from 'react'

import Hero from '../Components/hero'

function ErrorPage() {
	return (
		<div className="main">
			<Hero title="404 Not Found" path="/" banner="Return Home" err={true} />
		</div>
	)
}

export default ErrorPage
