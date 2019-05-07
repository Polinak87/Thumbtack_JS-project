import React from 'react';
import ThingInfo from '../../../components/thingInfo';
import ButtonCancel from './buttonCancel';


export default class ApplicationCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, ThingDesired, ThingOffered, status } = this.props.application;
    const button = () => {
      if(status == "pending") {
        return <ButtonCancel id={id} updateData={this.props.updateData}/>
      }
      return <></>
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
              <p>Thing you want to have</p>
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
              <p>Thing you want to change</p>
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
