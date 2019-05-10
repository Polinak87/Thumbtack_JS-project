import React from 'react';
import { Link } from 'react-router-dom';

export default class Infomessage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    event.preventDefault();
    const message = '';
    const showMessage = false;
    this.props.updateMessage(message, showMessage)
  }

  render() {
    return (
      <>
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-content">
            <article className="message is-info is-medium">
              <div className="message-header">
                <p>Info</p>
                <Link to={this.props.urlForRedirect} button className="delete" onClick={this.handleClick}></Link>
              </div>
              <div className="message-body">
                {this.props.message}
              </div>
              <div>
              </div>
            </article>
          </div>
        </div>
      </>
    );
  }
}



