import React, { Component } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';

import ImageList from './components/ImageList';

export default class App extends Component {
	render() {
		return ( 
			<Router>
				<Route path="/" exact render={() => 
					<div>
						<h1 className="title is-1 center">easy r34 browsing</h1>
						<ImageList/>
					</div>
					
				}/>
			</Router>
		)
	}
}