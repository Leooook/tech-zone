import React from 'react'
import { Switch, Route } from 'react-router-dom'

import './App.css'
import MainPage from './Pages/mainPage'
import ProductsPage from './Pages/productsPage'
import DetailPage from './Pages/detailPage'
import CartPage from './Pages/cartPage'
import AboutPage from './Pages/aboutPage'
import ContactPage from './Pages/contactPage'
import ErrorPage from './Pages/errorPage'
import Nav from './Components/nav'

function App() {
	return (
		<div>
			<Nav />
			<Switch>
				<Route exact path="/" component={MainPage} />
				<Route exact path="/products" component={ProductsPage} />
				<Route exact path="/products/:slug" component={DetailPage} />
				<Route exact path="/cart" component={CartPage} />
				<Route exact path="/about" component={AboutPage} />
				<Route exact path="/contact" component={ContactPage} />
				<Route component={ErrorPage} />
			</Switch>
		</div>
	)
}

export default App
