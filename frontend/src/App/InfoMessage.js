import React from 'react';
import { connect } from 'react-redux';
import { deleteMessage } from '../store/actions/main';

function InfoMessage(props) {
  const { message, deleteMessage } = props;
  const { text } = message;

  const onClose = () => {
    event.preventDefault();
    deleteMessage();
  }

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <article className="message is-info is-medium" name="modalMessage">
          <div className="message-header">
            <p>Info</p>
            <button className="delete" onClick={onClose} />
          </div>
          <div className="message-body">{text}</div>
        </article>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  message: state.main.message,
});

const mapDispatchToProps = dispatch => ({
  deleteMessage: () => dispatch(deleteMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoMessage);
