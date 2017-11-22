import React from 'react';
import {hideModal} from 'react-redux-easy-modal';

const ModalForm = () => (
	<div className="modal fade show" style={{textAlign: 'left', display: 'block'}} >
		<div className="modal-dialog" role="document">
			<div className="modal-content">
				<div className="modal-header">
					<h5 className="modal-title" id="exampleModalLabel">New message to @mdo</h5>
					<button type="button" className="close" onClick={hideModal}>
						<span aria-hidden="true">×</span>
					</button>
				</div>
				<div className="modal-body">
					<form>
						<div className="form-group">
							<label htmlFor="recipient-name" className="form-control-label">Recipient:</label>
							<input type="text" className="form-control" id="recipient-name"/>
						</div>
						<div className="form-group">
							<label htmlFor="message-text" className="form-control-label">Message:</label>
							<textarea className="form-control" id="message-text"></textarea>
						</div>
					</form>
				</div>
				<div className="modal-footer">
					<button type="button" className="btn btn-secondary" onClick={hideModal}>Close</button>
					<button type="button" className="btn btn-primary">Send message</button>
				</div>
			</div>
		</div>
	</div>
);

export default ModalForm;