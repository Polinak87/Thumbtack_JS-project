import React from 'react';

export default class Select extends React.Component {

  render() {
    const type = { fullwidth: 'is-fullwidth'} ;
    const { onChange, value, categoryOptons } = this.props;
    return (
      <div className="field">
        <div className="control is-expanded">
          <div className={`select ${type.fullwidth}`}>
            <select name="categoryId" onChange={onChange} value={value}>
              {categoryOptons}
            </select>
          </div>
        </div>
      </div>
    );
  }
}