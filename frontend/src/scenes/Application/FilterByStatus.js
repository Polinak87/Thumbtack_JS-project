import React from 'react';

export default class FilterByStatus extends React.Component {
  render() {
    const { onChange } = this.props;
    return (
      <div className="field">
        <div className="control is-expanded">
          <div className="is-inline select is-primary">
            <select onChange={onChange}>
              <option key="all" value="all">
                all
              </option>
              <option key="completed" value="completed">
                completed
              </option>
              <option key="rejected" value="rejected">
                rejected
              </option>
              <option key="pending" value="pending">
                pending
              </option>
              <option key="canceled" value="canceled">
                canceled
              </option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}
