import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { incrementCounter, decrementCounter } from '../../actions/index';

class Counter extends PureComponent {
	constructor() {
		super();

		this.sId = 0;

		this.onIncrement = this.onIncrement.bind(this);
		this.onDecrement = this.onDecrement.bind(this);
		this.onIncrementStart = this.onIncrementStart.bind(this);
		this.onIncrementStop = this.onIncrementStop.bind(this);
	}

	/**
	 * Метод для увеличения счетчика.
	 */
	onIncrement() {
		const { dispatch } = this.props;

		dispatch(incrementCounter());
	}

	/**
	 * Метод для уменьшения счетчика.
	 */
	onDecrement() {
		const { dispatch } = this.props;

		dispatch(decrementCounter());
	}

	/**
	 * Метод для автоматического увеличения счетчика.
	 */
	onIncrementStart() {
		const { dispatch } = this.props;

		dispatch(incrementCounter());

		this.sId = setInterval(() => {
			dispatch(incrementCounter());
		}, 1000);
	}

	/**
	 * Метод остановки автоматического увеличения счетчика.
	 */
	onIncrementStop() {
		clearInterval(this.sId);
	}

	render() {

		console.log(this.onIncrement());
		const { counter } = this.props;

		return (
			<p className="counter">
				Clicked: {counter} times

				<button onClick={this.onIncrement}>+</button>
				<button onClick={this.onDecrement}>-</button>

				<button onClick={this.onIncrementStart}>start</button>
				<button onClick={this.onIncrementStop}>stop</button>
			</p>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		counter: state.counter
	}
};

export default connect(mapStateToProps)(Counter);