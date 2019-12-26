import React from 'react';
import { Link } from 'react-router-dom';
import ThingInfo from '../../components/ThingInfo';
import Button, { green, large } from '../../components/Button';

export default function Card(props) {
  const {
    image,
    id,
    name,
    description,
    categoryName,
    onMarket,
    onMarketAt,
    user,
    userId,
    currentUserId,
    onButtonClick,
    onTitleClick,
  } = props;

  const { firstName, lastName } = user;

  const button = () => {
    if (currentUserId === userId) {
      return;
    }
    return (
      <Button
        to="/things-for-exchange"
        className={`${large} ${green}`}
        id={id}
        userId={userId}
        onClick={onButtonClick}
      >
        Exchange
        </Button>
    );
  };

  return (
    <div className="card">
      <div className="card-header">
        <Link
          to="/market-things-filtered-by-user"
          className="card-header-title has-text-grey is-centered is-italic is-size-3"
          onClick={() => onTitleClick(userId)}
        >
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
        onMarketAt={onMarketAt}
      />
      {button()}
    </div>
  );
}
