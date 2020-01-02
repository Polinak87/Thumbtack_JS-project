import React from 'react';

export default function Header(props) {
  return (
    <div className="card-header">
      <Link
        to="/market-things-filtered-by-user"
        className="card-header-title has-text-grey is-centered is-italic is-size-3"
        onClick={() => onTitleClick(userId)}
      >
        By {firstName} {lastName}
      </Link>
    </div>
  );
}