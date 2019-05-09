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
    let statusForFilter

    if (this.radioAll.current.checked) {
      statusForFilter = 'all';

      axios.get(this.props.urlBase)
      .then((response) => {
        console.log(response.data);
        var map = new Map();
        response.data.forEach(function (thing) {
          map.set(thing.id, thing)
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
      console.log(this.props.urlForFilter);
      axios.post(this.props.urlForFilter, {
        params: {
          status: statusForFilter,
        }
      })
        .then((response) => {
          console.log(response.data);
          var map = new Map();
          response.data.forEach(function (thing) {
            map.set(thing.id, thing)
          });
          this.props.updateValue(map);
        });
    }    
  }

  render() {

    return (
      <>
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
        </div>
        <br />
        <div className="control">
          <button className="button is-block is-success is-large is-fullwidth" onClick={this.handleClick}>Filter</button>
        </div >
      </>
    )
  };
}
