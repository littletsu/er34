import React, { Component } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';

import ImageList from './components/ImageList';
import CommandTab from './components/CommandTab';


export default class App extends Component {
	render() {
		return ( 
			<Router>
				<Route path="/" exact render={() => 
					<div>
						<CommandTab key="ill give you your fucken key"/>
						<h1 className="title is-1 center">easy r34 browsing</h1>
						<ImageList key="0"/>
						
					</div>
					
				}/>
			</Router>
		)
	}
}