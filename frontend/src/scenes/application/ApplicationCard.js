import React from 'react';
import ThingInfo from '../../components/ThingInfo';
import Button from '../../components/Button';


export default class ApplicationCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { titleRight, titleLeft, applicationType, updateData, onClick } = this.props;
    const { id, ThingDesired, ThingOffered, status } = this.props.application;

    const button = () => {
      switch (status) {
        case "pending":
          if (applicationType === 'outbox') {
            return <Button
              type='Cancel application'
              id={id}
              updateData={updateData} 
              onClick={onClick} />
          } else {
            return (
              <div>
                <Button
                  type='Complete application'
                  id={id}
                  updateData={updateData}
                  onClick={onClick} />
                <br />
                <Button
                  type='Reject application'
                  id={id}
                  updateData={updateData}
                  onClick={onClick} />
              </div>
            )
          }
        default:
          return <></>
      }
    }

    return (
      <div className="card" >
        <div className="card-content">
          <h6 className="title">
            Status of application: {status}
          </h6>
        </div>
        <footer className="card-footer">
          <div className="card-footer-item">
            <div className="card-is-full">
              <p>{titleLeft}</p>
              <br />
              <ThingInfo
                id={ThingDesired.id}
                name={ThingDesired.name}
                description={ThingDesired.description}
                categoryName={ThingDesired.Category.name} />
            </div>
          </div>
          <div className="card-footer-item">
            <div className="card-is-full">
              <p>{titleRight}</p>
              <br />
              <ThingInfo
                id={ThingOffered.id}
                name={ThingOffered.name}
                description={ThingOffered.description}
                categoryName={ThingOffered.Category.name} />
            </div>
          </div>
        </footer>
        {button()}
      </div>
    )

    return (
      <div className="card" >
        <div className="card-header"></div>
        <div className="card-content">
          <h6 className="title">
            ...
        </h6>
        </div>
        <footer className="card-footer">
          {/* <div className="card-footer-item">
            <div className="card-is-full">
              ...
          </div>
          </div>
          <div className="card-footer-item">
            <div className="card-is-full">
              ...
          </div> */}
          {/* </div> */}
        </footer>
        ...
    </div>
    )
  }
}



