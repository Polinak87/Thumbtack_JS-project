import React from 'react';
import ThingInfo from '../../components/ThingInfo';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import store from '../../store/index';
import { addFiltrationByUser } from '../../store/actions/filtration';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
        this.onClick = this.onClick.bind(this);
  }

  onClick(id) {
    console.log('ура!!!!!')
    store.dispatch(addFiltrationByUser({ id }));
  }

  render() {
    const { image, id, name, description, categoryName, onMarket, onMarketAt, user, userId, currentUserId, onClick } = this.props;
    const button = () => {
      if (currentUserId === userId) {
        return <></>
      } return <Button type='Exchange' id={id} userId={userId} onClick={onClick}/>
    }

    return (
      <div className="card">
        <div className="card-header">
          <Link to="/marketthingsfilteredbyuser" className="card-header-title has-text-grey is-centered is-italic is-size-3" onClick={() => this.onClick(user.id)}> 
            By {user.firstName} {user.lastName}
          </Link>
        </div>
        <ThingInfo
          image={image}
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