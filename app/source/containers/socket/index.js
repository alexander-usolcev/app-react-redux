import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import io from 'socket.io-client';

import { API_HOST } from '../../const/environment';


class Socket extends PureComponent {
	constructor() {
		super();

		this.state = {
			connected: false,
		};

		this.socket = null;

		this.sendMessage = this.sendMessage.bind(this);
		this.connectSocket = this.connectSocket.bind(this);
		this.disconnectSocket = this.disconnectSocket.bind(this);
	}

	componentDidMount() {
		this.connectSocket();
	}

	componentWillUnmount() {
		this.disconnectSocket();
	}

	/**
	 * Метод отправки сообщения.
	 */
	sendMessage() {
		this.socket.emit('message', { message: this.textarea.value });
	}

	/**
	 * Метод для коннекта с socket.io.
	 */
	connectSocket() {
		this.socket = io.connect(API_HOST);

		this.socket.on('message', data => {
			console.log('Message from server', data);

			this.createLog(data.message);
		});

		this.socket.on('connect', () => {
			this.setState({
				connected: true
			})
		});
	}

	/**
	 * Метод дисконекта socket.io.
	 */
	disconnectSocket() {
		this.socket.disconnect();

		this.setState({
			connected: false
		})
	}

	/**
	 * Метод создания DOM node с полученным сообщением от сервера.
	 *
	 * @param message
	 */
	createLog(message) {
		let div = document.createElement('div');
		div.innerHTML = message;

		this.socketLog.prepend(div);
	}


	render() {
		return (
			<div>
				<div className="messages">
					<textarea ref={el => this.textarea = el} rows="10" cols="40"></textarea>
					<div ref={el => this.socketLog = el} className='socket-log'></div>
				</div>

				<p>
					<button onClick={this.sendMessage}>Send message</button>
				</p>

				<p>
					<button onClick={this.connectSocket}>{this.state.connected ? 'Connected' : 'Connect'}</button>
					<button onClick={this.disconnectSocket}>Disconnect</button>
				</p>
			</div>
		);
	}
}

export default withRouter(Socket);