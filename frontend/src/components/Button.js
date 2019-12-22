import React from 'react';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.style = this.style.bind(this);
  }

  style(type){
    const Green = ['Add to market','Complete application','Exchange','Choose','Add to inventory'];
    if (Green.includes(type)) {
      return "is-success";
    }
    const Red = ['Reject application', 'Cancel application', 'Remove from market'];
    if (Red.includes(type)) {
      return "is-danger";
    }
  };

  render() {
    let {type, onClick, id, userId} = this.props;
    console.log(type);
    return (
      <>
        <button className={`button is-block ${this.style(type)} is-large is-fullwidth`} onClick={() => onClick(id, userId)}> {type} </button>
      </>
    );
  }
}
