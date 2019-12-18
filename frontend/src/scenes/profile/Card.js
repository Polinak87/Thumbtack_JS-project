import React from 'react';
import ThingInfo from '../../components/ThingInfo';
import Button from '../../components/Button';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      id,
      image,
      name,
      description,
      categoryName,
      onMarket,
      onMarketAt,
      onClickAdd,
      onClickRemove,
    } = this.props;
  
    let button;
    if (onMarket) {
      button = (
        <Button type="Remove from market" id={id} onClick={onClickRemove}>
          Remove from market
        </Button>
      );
    } else {
      button = (
        <Button type="Add to market" id={id} onClick={onClickAdd}>
          Add to market
        </Button>
      );
    }
    // button - скоее всего без закрывающего тэга, просто />

    return (
      <div className="card">
        <ThingInfo
          image={image}
          id={id}
          name={name}
          description={description}
          categoryName={categoryName}
          onMarket={onMarket}
          onMarketAt={onMarketAt}
        />
        {button}
      </div>
    );
  }
}
