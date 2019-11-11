import React from 'react';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.style = this.style.bind(this);
  }

  style(type){
    if (type=='Add to market') {
    return "button is-block is-success is-large is-fullwidth";
    };
    if (type=='Remove from market'){
    return "button is-block is-danger is-large is-fullwidth";
    };
    if (type=='Complete application'){
      return "button is-block is-success is-large is-fullwidth";
    };
    if (type=='Reject application'){
      return "button is-block is-danger is-large is-fullwidth";
    };
    if (type=='Cancel application'){
      return "button is-block is-danger is-large is-fullwidth";
    };
  };

  render() {
    let {type, onClick, id} = this.props;
    console.log(type);
    return (
      <>
        <button className={this.style(type)} onClick={() => onClick(id, type)}> {type} </button>
      </>
    );
  }
}

