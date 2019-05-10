import React from 'react';
import { Link } from 'react-router-dom';
import ThingInfo from '../../components/thingInfo';
import ButtonExchange from './buttonExchange';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick() {
  }

  render() {
    const { id, name, description, categoryName, onMarket, onMarketAt, user, userId, currentUserId } = this.props;
    const button = () => {
      if (currentUserId === userId) {
        return <></>
      } return <ButtonExchange id={id} userId={userId} />
    }

    return (
      <div className="card">
        <div className="card-header">
          <div className="card-header-title has-text-grey is-centered is-italic is-size-3" onClick={this.handleClick}> 
            By {user.firstName} {user.lastName}
          </div>
        </div>
        <ThingInfo
          id={id}
          name={name}
          description={description}
          categoryName={categoryName}
          onMarket={onMarket}
          onMarketAt={onMarketAt} />
        <>
        {button()}
        </>
      </div >
    );
  }
}