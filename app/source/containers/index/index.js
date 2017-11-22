import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Modal, MobileModals, showModal, hideModal, ModalContainer } from 'react-redux-easy-modal';

import { fetchUserDataIfNeeded } from '../../actions/index';
import Lang from '../../lang';

import ModalForm from '../../components/index/ModalForm';


class Index extends PureComponent {
	// noinspection JSCheckFunctionSignatures
	async componentDidMount() {
		const { dispatch } = this.props;

		await dispatch(fetchUserDataIfNeeded());

		const { TITLE } = Lang.get();
		document.title = TITLE;


		// do something after request.
		// console.log('[APP]: After request');
	}

	render() {
		const { isFetching, userData } = this.props;
		const { firstName, gitProfile, lastName } = userData;

		return (
			<div>
				<a href={gitProfile} target="_blank">{firstName} git page</a>

				<div>
					<button className="open-modal" onClick={showModal}>open modal form</button>
				</div>

				<Modal>
					<ModalForm />
				</Modal>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		userData: state.userData,
		isFetching: state.userData.isFetching
	}
};

export default withRouter(connect(mapStateToProps)(Index));
