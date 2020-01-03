import React from 'react';
import CardFooter from './CardFooter';
import CardButton from './CardButton';

export default function ApplicationCard(props) {
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

    const { id: thingDesId, Thing: thing1} =ThingDesired;
    const { image: thingDesImage, name: thingDesName, description: thingDesDescription, Category: thingDesCategory } = thing1;
    const { name: thingDesCategoryName } = thingDesCategory;

    const { id: thingOffId, Thing: thing2} =ThingOffered;
    const { image: thingOffImage, name: thingOffName, description: thingOffDescription, Category: thingOffCategory } = thing2;
    const { name: thingOffCategoryName } = thingOffCategory;

    return (
      <div className="card">
        <div className="card-content">
          <h6 className="title">Status of application: {status}</h6>
        </div>
        <footer className="card-footer">
          <CardFooter
            title={titleLeft}
            image={thingDesImage}
            id={thingDesId}
            name={thingDesName}
            description={thingDesDescription}
            categoryName={thingDesCategoryName}
          />
          <CardFooter
            title={titleRight}
            image={thingOffImage}
            id={thingOffId}
            name={thingOffName}
            description={thingOffDescription}
            categoryName={thingOffCategoryName}
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
