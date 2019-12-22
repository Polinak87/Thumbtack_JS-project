import React from 'react';
import ThingInfo from '../../components/ThingInfo';

export default function CardFooter(props) {
  const { image, id, name, description, categoryName, title } = props;
  return (
    <div className="card-footer-item">
      <div className="card-is-full">
        <p>{title}</p>
        <br />
        <ThingInfo
          image={image}
          id={id}
          name={name}
          description={description}
          categoryName={categoryName}
        />
      </div>
    </div>
  );
}
