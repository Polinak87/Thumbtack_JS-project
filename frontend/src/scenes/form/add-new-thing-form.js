import React from 'react';
import axios from 'axios';

class AddNewThingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      categoryId: '1',
      categoryList: [],
    }

    this.barabashka1 = React.createRef();
    this.barabashka2 = React.createRef();
    this.barabashka3 = React.createRef();

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/api/category')
    .then((response) => {
      this.setState({ categoryList: response.data })
    });
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeDescription(event) {
    this.setState({ description: event.target.value });
  }

  handleChangeCategory(event) {
    this.setState({ categoryId: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, description, categoryId } = this.state;
    console.log(name, description, categoryId);
    axios.post('/api/addnewthing', { name, description, categoryId }).then((response) => {
      console.log(response);
    });
  }

  render() {
    let categoryOptons = [];
    this.state.categoryList.forEach((cat, index) => {
      categoryOptons.push(
        <option key={cat.id} value={cat.id}>{cat.name} </option>
      );
    });

    return (
      <div>
        <br/>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Add new thing to your inventory
              </h1>
            </div>
          </div>
        </section>
        <br/>
        <div className="column is-one-quarter">
          <form className="" onSubmit={this.handleSubmit}>
            <input className="input" type="text" placeholder="Name" onChange={this.handleChangeName} value={this.state.name} ref={this.barabashka1} />
            <input className="input" type="text" placeholder="Description" onChange={this.handleChangeDescription} value={this.state.description} ref={this.barabashka2} />
            <div className="control">
              <div className="select">
                <select onChange={this.handleChangeCategory}  value={this.state.categoryId} ref={this.barabashka3}>
                  {categoryOptons}
                </select>
              </div>
            </div>
            <br/>
            <input className="button is-block is-success is-large is-fullwidth" type="submit" value="Add"></input>
          </form>
        </div>
      </div>
    );
  };
}

export default AddNewThingForm;