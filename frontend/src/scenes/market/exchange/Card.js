import React from 'react';
import ThingInfo from '../../../components/ThingInfo';
import ButtonChoose from './ButtonChoose';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, name, description, categoryName, onMarket, onMarketAt, updateData } = this.props;

    return (
      <div className="card">
        <ThingInfo
          id={id}
          name={name}
          description={description}
          categoryName={categoryName}
          onMarket={onMarket}
          onMarketAt={onMarketAt}/>
        <ButtonChoose
          id={id}
          updateData={updateData}/>
      </div >
    );
  }
}