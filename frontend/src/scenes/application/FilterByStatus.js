import React from 'react';
import axios from 'axios';

export default class FilterByStatus extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.radioAll = React.createRef();
    this.radioPending = React.createRef();
    this.radioRejected = React.createRef();
    this.radioCompleted = React.createRef();
    this.radioCanceled = React.createRef();
  }

  handleClick() {
    event.preventDefault();
    let statusForFilter;

    if (this.radioAll.current.checked) {
      statusForFilter = 'all';

      axios.get(this.props.urlBase).then(response => {
        var map = new Map();
        response.data.forEach(function(thing) {
          map.set(thing.id, thing);
        });
        this.props.updateValue(map);
      });
    }
    if (this.radioPending.current.checked) {
      statusForFilter = 'pending';
    }
    if (this.radioRejected.current.checked) {
      statusForFilter = 'rejected';
    }
    if (this.radioCompleted.current.checked) {
      statusForFilter = 'completed';
    }
    if (this.radioCanceled.current.checked) {
      statusForFilter = 'canceled';
    }
    if (statusForFilter !== 'all') {
      axios
        .post(this.props.urlForFilter, {
          params: {
            status: statusForFilter,
          },
        })
        .then(response => {
          var map = new Map();
          response.data.forEach(function(thing) {
            map.set(thing.id, thing);
          });
          this.props.updateValue(map);
        });
    }
  }

  render() {
    return (
      <section className="section">
        <div className="columns is-centered">
          <div className="column is-narrow is-centered">
            <div className="field">
              <div className="control">
                <label className="radio">
                  <input type="radio" name="filter" defaultChecked ref={this.radioAll} />
                  all
                </label>
                <label className="radio">
                  <input type="radio" name="filter" ref={this.radioPending} />
                  pending
                </label>
                <label className="radio">
                  <input type="radio" name="filter" ref={this.radioCompleted} />
                  completed
                </label>
                <label className="radio">
                  <input type="radio" name="filter" ref={this.radioRejected} />
                  rejected
                </label>
                <label className="radio">
                  <input type="radio" name="filter" ref={this.radioCanceled} />
                  canceled
                </label>
              </div>
              <div>
                <label className="radio">
                  <input type="radio" name="filter" />1
                </label>
                <label className="radio">
                  <input type="radio" name="filter" />2
                </label>
              </div>
            </div>
            <br />
            <div className="control">
              <button
                className="button is-block is-success is-large is-fullwidth"
                onClick={this.handleClick}
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
