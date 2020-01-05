import React from 'react';
import { Link } from 'react-router-dom';
import Content from './Content';

export default function Header({ children, ...attrs }) {
  const tag = () => {
    if (attrs.to) {
      return Link;
    }
    return 'div';
  };

  const Tag = tag();

  return (
    <Content>
      <Tag  {...attrs} className="card-header-title has-text-grey is-centered is-italic is-size-3">
        {children}
      </Tag>
    </Content>
  );
}
