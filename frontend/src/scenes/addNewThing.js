import React from 'react';
import axios from 'axios';

class AddNewThingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      categoryId: '1',// используется как значение по умолчанию, 
      // т.к. если в селекторе пользователь хочет выбрать первое значение, 
      // то фактически он не переключает селектор и handleChangeCategory не подхатывает значение поля, 
      // если пользователь выбирает любую категорию кроме первой, то handleChangeCategory заменяет еденицу на выбранное значение
      categoryList: [],
    }

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
    axios.post('/api/addnewthing', { name, description, categoryId }).then((response) => {
      if (response.status = 200) {
        this.setState(
          {
            name: '',
            description: '',
            categoryId: '1',
          }
        );
      }
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
        <br />
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Add new thing to your inventory
              </h1>
            </div>
          </div>
        </section>
        <br />
        <div className="column is-one-quarter">
          <form className="" onSubmit={this.handleSubmit}>
            <div className="field">
              <div className="control">
                <input className="input" type="text" required placeholder="Name" autoFocus onChange={this.handleChangeName} value={this.state.name} />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input className="input" type="text" required placeholder="Description" onChange={this.handleChangeDescription} value={this.state.description} />
              </div>
            </div>
            <div className="field">
              <div className="control is-expanded">
                <div className="select is-fullwidth">
                  <select onChange={this.handleChangeCategory} value={this.state.categoryId} >
                    {categoryOptons}
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input className="button is-block is-success is-large is-fullwidth" type="submit" value="Add" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };
}

export default AddNewThingForm;