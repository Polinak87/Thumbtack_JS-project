import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Hero from '../../components/Hero';
import store from '../../store/index';
import { addMessage } from '../../store/actions/message';
import { deleteMessage } from '../../store/actions/message';
import Infomessage from '../../components/InfoMessage';
import Catalog from './catalog';

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
      file:{},
    }

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
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

  handleChangeFile(event) {
    console.log(event.target.files[0]);
    // добавить  thing id
    this.setState({ file: event.target.files[0]})
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, description, categoryId, file } = this.state;
    axios.post('/api/addnewthing', { name, description, categoryId })
      .then((response) => {
        let formData = new FormData();
        formData.append('file', file);
        axios.post('api/addimage', formData,
        {
          params: {
            id: '1',
          },
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then((response) => {
            store.dispatch(addMessage({ messageText: 'New thing is added to your inventory.' }));
          });
      });
  }

  onClose() {
    event.preventDefault();
    store.dispatch(deleteMessage());
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
        <Hero text='Add new thing to your inventory' type="hero is-primary" />
        <br />
        <div className="column is-one-quarter">
          <form className="" encType="multipart/form-data" onSubmit={this.handleSubmit}>
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
                <input className="input" type="file" name="userFile" onChange={this.handleChangeFile} />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input className="button is-block is-success is-large is-fullwidth" type="submit" value="Add" />
              </div>
            </div>
          </form>
        </div>
        {!_.isEmpty(this.props.message) &&
          <Infomessage
            text={this.props.message.messageText}
            urlForRedirect='/addnewthing'
            onClose={this.onClose} />
        }
        <Catalog />
      </div>
    );
  };
}

const mapStateToProps = state => ({
  message: state.message,
});

export default connect(mapStateToProps)(AddNewThingForm);