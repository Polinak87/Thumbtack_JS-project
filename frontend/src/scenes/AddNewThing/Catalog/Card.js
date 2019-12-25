import React from 'react';
import ThingInfo from '../../../components/ThingInfo';
import Button from '../../../components/Button';
import { green, large } from '../../../components/Button';

export default class Card extends React.Component {
  render() {
    const { image, id, name, description, categoryName, onClick } = this.props;

    return (
      <div className="card">
        <ThingInfo
          image={image}
          id={id}
          name={name}
          description={description}
          categoryName={categoryName}/>
          <Button className={large + " " + green} value='Add to inventory' id={id} onClick={onClick}/>
      </div >
    );
  }
}