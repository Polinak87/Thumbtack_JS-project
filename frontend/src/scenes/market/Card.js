import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ThingInfo from '../../components/ThingInfo';
import Button from '../../components/Button';
import { addFiltrationByUser } from '../../store/actions/filtration';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(id) {
    const { addFiltrationByUser } = this.props;
    addFiltrationByUser({id});
  }

  render() {
    const { image, id, name, description, categoryName, onMarket, onMarketAt, user, userId, currentUserId, onClick } = this.props;
    const { firstName, lastName } = user;
    const button = () => {
      if (currentUserId === userId) {
        return;
      } return <Button type='Exchange' id={id} userId={userId} onClick={onClick} />
    }

    return (
      <div className="card">
        <div className="card-header">
          <Link to="/marketthingsfilteredbyuser" className="card-header-title has-text-grey is-centered is-italic is-size-3" onClick={() => this.onClick(user.id)}>
            By {firstName} {lastName}
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

const mapDispatchToProps = dispatch => ({
  addFiltrationByUser: (id) => dispatch(addFiltrationByUser(id)),
  dispatch,
});

export default connect(null, mapDispatchToProps)(Card);