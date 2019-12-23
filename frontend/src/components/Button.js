import React from 'react';
import classNames from 'classnames';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    // this.style = this.style.bind(this);
  }

  classes = () => {
    classNames(
      "button",
      this.props.className,
    );
    console.log('this.props.className');
    console.log(this.props.className);
  }

  // style(type) {
  //   const Green = ['Add to market', 'Complete application', 'Exchange', 'Choose', 'Add to inventory'];
  //   if (Green.includes(type)) {
  //     return "is-success";
  //   }
  //   const Red = ['Reject application', 'Cancel application', 'Remove from market'];
  //   if (Red.includes(type)) {
  //     return "is-danger";
  //   }
  // };

  render() {
    let { value, onClick, id, userId, ...attrs } = this.props;
    // console.log(type);
    return (
      <button {...attrs} className={this.classes} onClick={() => onClick(id, userId)}> {value} </button>
    );
  }
}
