import React from 'react';
import ThingInfo from '../../components/ThingInfo';
import Button from '../../components/Button'

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, name, description, categoryName, onMarket, onMarketAt, updateData, onClick } = this.props;
    let button;
    if (onMarket) {
      button = <Button type='Remove from market' updateData={updateData} id={id} onClick={onClick}>Remove from market</Button>;
    } else {
      button = <Button type='Add to market' updateData={updateData} id={id} onClick={onClick}>Add to market</Button>;
    }

    return (
      <div className="card">
        <ThingInfo
          id={id}
          name={name}
          description={description}
          categoryName={categoryName}
          onMarket={onMarket}
          onMarketAt={onMarketAt}/>
          {button}
      </div >
    );
  }
}