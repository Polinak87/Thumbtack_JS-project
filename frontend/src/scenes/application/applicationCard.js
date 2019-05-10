import React from 'react';
import ThingInfo from '../../components/thingInfo';
import ButtonCancel from './outbox/buttonCancel';
import ButtonComplete from './inbox/buttonComplete';
import ButtonReject from './inbox/buttonReject';


export default class ApplicationCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const{ titleRight, titleLeft, applicationType, updateMessage, updateData } = this.props;
    const { id, ThingDesired, ThingOffered, status } = this.props.application;

    const button = () => {
      switch (status) {
      case "pending":
        if(applicationType === 'outbox'){
          return <ButtonCancel 
                  id={id}
                  updateData={updateData}
                  updateMessage={updateMessage}/>
        } else {
          return (
            <div>
              <ButtonComplete 
                id={id}
                updateData={updateData}
                updateMessage={updateMessage}/>
              <br/>
              <ButtonReject
                id={id} 
                updateData={updateData}
                updateMessage={updateMessage}/>
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
  }
}
