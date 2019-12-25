import React from 'react';
import ApplicationCard from './ApplicationCard';
import FilterByStatus from './FilterByStatus';
import Hero from '../../components/Hero';
import CardBlock from '../../components/CardBlock';
import Column from '../../components/Column';

export default function Application(props) {
  let cardList = [];
  const { heroText, value, applicationType, titleLeft, titleRight, onClickComplete, onClickReject, onFilterChange, onClickCancel } = props;

  for (let application of value.values()) {
    const { id } = application;
    cardList.push(
      <Column key={id}>
        <ApplicationCard
          application={application}
          applicationType={applicationType}
          titleLeft={titleLeft}
          titleRight={titleRight}
          onClickComplete={onClickComplete}
          onClickReject={onClickReject}
          onClickCancel={onClickCancel}
        />
      </Column>,
    );
  }

  return (
    <div>
      <br />
      <Hero text={heroText} type="hero is-primary" />
      <FilterByStatus onChange={onFilterChange} />
      <CardBlock cardList={cardList} />
    </div>
  )
}