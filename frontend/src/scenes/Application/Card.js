import React from 'react';
import CardFooterItem from './CardFooterItem';
import CardButton from './CardButton';
import Header from '../../components/Card/Header'
import Title2 from '../../components/Titles/Title2';

export default function Card(props) {
  const {
    titleRight,
    titleLeft,
    application,
    applicationType,
    onClickComplete,
    onClickReject,
    onClickCancel,
  } = props;

  const { id, ThingDesired, ThingOffered, status } = application;

  return (
    <div className="card">
      <Header>
        <Title2>Status of application: {status}</Title2>
      </Header>
      <footer className="card-footer">
        <CardFooterItem
          title={titleLeft}
          userThing={ThingDesired}
        />
        <CardFooterItem
          title={titleRight}
          userThing={ThingOffered}
        />
      </footer>
      <CardButton
        status={status}
        applicationType={applicationType}
        id={id}
        onClickComplete={onClickComplete}
        onClickReject={onClickReject}
        onClickCancel={onClickCancel}
      />
    </div>
  );
}
