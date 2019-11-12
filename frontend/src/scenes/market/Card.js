import React from 'react';
import ThingInfo from '../../components/ThingInfo';
import Button from '../../components/Button';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick() {
  }

  render() {
    const { id, name, description, categoryName, onMarket, onMarketAt, user, userId, currentUserId, onClick } = this.props;
    const button = () => {
      if (currentUserId === userId) {
        return <></>
      } return <Button type='Exchange' id={id} userId={userId} onClick={onClick}/>
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