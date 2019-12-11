import React from 'react';
import ThingInfo from '../../components/ThingInfo';
import Button from '../../components/Button'

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, name, description, categoryName, onClick } = this.props;

    return (
      <div className="card">
        <ThingInfo
          id={id}
          name={name}
          description={description}
          categoryName={categoryName}/>
          <Button type='Add to inventory' id={id} onClick={onClick}/>
      </div >
    );
  }
}