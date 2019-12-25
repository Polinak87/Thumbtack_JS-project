import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export const green = "is-success";
export const red = "is-danger";
export const light = "is-light";
export const large = "is-block is-large is-fullwidth";

export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  classes = () => {
    return classNames(
      "button",
      this.props.className,
    );
  }

  render() {
    let { value, onClick, id, userId, className, ...attrs } = this.props;

    const tag = () => {
      if (attrs.to) {
        return Link;
      };
      return "button";
    }

    const onButtonClick = () => {
      if (this.props.onClick) {
      return onClick(id, userId);
    } return null;
  }

    const Tag = tag();

    return (
      <Tag className={this.classes()} {...attrs} onClick={onButtonClick} > {value} </Tag>
    );
  }
}
