import React from 'react';
import ThingInfo from '../../components/ThingInfo';
import ButtonCancel from './outbox/ButtonCancel';
import ButtonComplete from './inbox/ButtonComplete';
import ButtonReject from './inbox/ButtonReject';


export default class ApplicationCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { titleRight, titleLeft, applicationType, updateData } = this.props;
    const { id, ThingDesired, ThingOffered, status } = this.props.application;

    const button = () => {
      switch (status) {
        case "pending":
          if (applicationType === 'outbox') {
            return <ButtonCancel
              id={id}
              updateData={updateData} />
          } else {
            return (
              <div>
                <ButtonComplete
                  id={id}
                  updateData={updateData} />
                <br />
                <ButtonReject
                  id={id}
                  updateData={updateData} />
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



