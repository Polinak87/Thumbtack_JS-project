import React from 'react';

export default class SelectFullwidth extends React.Component {
  render() {
    const { onChange, value, categoryOptons } = this.props;
    return (
      <div className="field">
        <div className="control is-expanded">
          <div className="select is-fullwidth">
            <select name="categoryId" onChange={onChange} value={value}>
              {categoryOptons}
            </select>
          </div>
        </div>
      </div>
    );
  }
}