import React from 'react';

export default function ThingInfo({
  id,
  image,
  name,
  description,
  categoryName,
  onMarket,
  onMarketAt,
}) {

  let dateTime;

  if (onMarket) {
    dateTime = <time dateTime="2016-1-1">On market from: {onMarketAt}</time>;
  } else {
    dateTime = <br />;
  }

  return (
    <div>
      <div className="card-image">
        <figure className="image is-square">
          <img src={image} alt="Thing image" />
        </figure>
      </div>
      <div className="card-content">
        id: {id}
        <br />
        Name: {name}
        <br />
        Category: {categoryName}
        <br />
        Description: {description}
        <br />
        {dateTime}
      </div>
    </div>
  );
}
