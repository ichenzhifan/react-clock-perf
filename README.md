# react-clock-perf
Improve the reconciliation process for react component.

Whenever you change the state of a React component, it triggers the reactive re-rendering process. React will construct a new virtual DOM representing your application¡¯s state UI and perform a diff with the current virtual DOM to work out what DOM elements should be mutated, added, or removed. This process is called reconciliation.

##Batching:
In React, whenever you call setState on a component, instead of updating it immediately React will only mark it as ¡°dirty¡±. That is, changes to your component¡¯s state won¡¯t take effect immediately; React uses an event loop to render changes in batch.

##Sub-Tree Rendering:
When the event loop ends, React re-renders the dirty components as well as their children, al the nested components, even if they didn't change, will have their render method called. 
This may sound inefficient, but in practice it is actually very fast, because React is not touching the actual DOM, all this happens in the in-memory virtual DOM.

##shouldComponentUpdate:   
Before re-rendering a child component, React will always invoke its shouldComponentUpdate method. By default, shouldComponentUpdate always returns true, but if you reimplement it and return false, React will skip re-rendering for this component and its children.

##React Perf:
npm install --save react-addons-perf

import Perf from 'react-addons-perf';

Perf.start();
render(<App />, document.getElementById('root'));

setTimeout(()=>{
	Perf.stop();

	// Prints the overall time taken
	Perf.printInclusive();

	// Times don't included the time taken to mount the components:
	// processing props, calling componentWillMount and componentDidMount etc.
	Perf.printExclusive();

	// Time is spent on components that didn't actually render anything.
	// in other words, the render stayed the same, so the DOM wasn't touched.
	Perf.printWasted();
}, 2000);


shouldComponentUpdate(nextProps, nextState){
	// Don't trigger a re-render unless the digit value was changed.
	return nextProps.value !== this.props.value;
}

##shallowCompare Add-on
- The component where you want to apply the shallow compare is "pure" (in other words, it renders the same result given the same props and state).
- You are using immutable values or React¡¯s immutability helper to manipulate state.

npm install --save react-addons-shallow-compare

import shallowCompare from 'react-addons-shallow-compare';
	
shouldComponentUpdate(nextProps, nextState) {
	return shallowCompare(this, nextProps, nextState)
}




