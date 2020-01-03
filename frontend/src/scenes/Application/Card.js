import React from 'react';
import CardFooterItem from './CardFooterItem';
import CardButton from './CardButton';
import Header from '../../components/Card/Header'

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
        <h6 className="title">Status of application: {status}</h6>
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
