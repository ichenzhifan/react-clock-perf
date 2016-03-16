import React, {Component} from 'react';
import {render} from 'react-dom';
import Perf from 'react-addons-perf';
import Clock from './components/Clock';

class App extends Component{
	constructor(){
		super(...arguments);
		this.state = this.getTime();
	}

	componentDidMount(){
		setInterval(()=>{
			this.setState(this.getTime());
		}, 10);
	}

	getTime(){
		let date = new Date();

		return {
			hours: date.getHours(),
			minutes: date.getMinutes(),
			seconds: date.getSeconds(),
			tenths: parseInt(date.getMilliseconds()/10)
		};
	}
	render(){	
		let clocks = [];
		for(let i=0; i<200; i++){
			clocks.push(<Clock key={i} hours={this.state.hours}
					minutes={this.state.minutes}
					seconds={this.state.seconds} 
					tenths={this.state.tenths}/>)
		}	
		return (
			<div>
				{clocks}
			</div>
		);
	}
}

Perf.start();
render(<App />, document.getElementById('root'));

setTimeout(()=>{
	Perf.stop();

	// Prints the overall time taken
	//Perf.printInclusive();

	// Times don't included the time taken to mount the components:
	// processing props, calling componentWillMount and componentDidMount etc.
	//Perf.printExclusive();

	// Time is spent on components that didn't actually render anything.
	// in other words, the render stayed the same, so the DOM wasn't touched.
	Perf.printWasted();
}, 2000);
