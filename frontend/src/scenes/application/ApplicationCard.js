import React from 'react';
import CardFooter from './CardFooter';
import CardButton from './CardButton';

export default class ApplicationCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { titleRight, titleLeft, applicationType, updateData, onClick } = this.props;
    const { id, ThingDesired, ThingOffered, status } = this.props.application;

    console.log(ThingDesired);
    console.log('ThingDesired');

    return (
      <div className="card">
        <div className="card-content">
          <h6 className="title">Status of application: {status}</h6>
        </div>
        <footer className="card-footer">
          <CardFooter
            title={titleLeft}
            image={ThingDesired.Thing.image}
            id={ThingDesired.id}
            name={ThingDesired.Thing.name}
            description={ThingDesired.Thing.description}
            categoryName={ThingDesired.Thing.Category.name}
          />
          <CardFooter
            title={titleRight}
            image={ThingOffered.Thing.image}
            id={ThingOffered.id}
            name={ThingOffered.Thing.name}
            description={ThingOffered.Thing.description}
            categoryName={ThingOffered.Thing.Category.name}
          />
        </footer>
        <CardButton
          status={status}
          applicationType={applicationType}
          id={id}
          updateData={updateData}
          onClick={onClick}
        />
      </div>
    );
  }
}
