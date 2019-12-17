import React from 'react';
import { connect } from 'react-redux';
import { deleteMessage } from '../store/actions/message';

class Infomessage extends React.Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    event.preventDefault();
    this.props.deleteMessage();
  }

  render() {
    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content">
          <article className="message is-info is-medium" name="modalMessage">
            <div className="message-header">
              <p>Info</p>
              <button className="delete" onClick={this.onClose}/>
            </div>
            <div className="message-body">
              {this.props.message.text}
            </div>
            <div>
            </div>
          </article>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.main.message,
});

const mapDispatchToProps = dispatch => ({
  deleteMessage: () => dispatch(deleteMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Infomessage);



