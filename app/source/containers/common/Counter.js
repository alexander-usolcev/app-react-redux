import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { incrementCounter, decrementCounter } from '../../actions/index';

class Counter extends PureComponent {
    constructor() {
        super();

        this.onIncrement = this.onIncrement.bind(this);
        this.onDecrement = this.onDecrement.bind(this);
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

    render() {
        const { counter } = this.props;

        return (
            <p className="counter">
                Clicked: {counter} times
                {' '}
                <button onClick={this.onIncrement}> + </button>
                {' '}
                <button onClick={this.onDecrement}> - </button>
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