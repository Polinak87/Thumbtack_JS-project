import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';
import Hero from '../../components/Hero';
import store from '../../store/index';
import { addMessage } from '../../store/actions/message';
import { deleteMessage } from '../../store/actions/message';
import Infomessage from '../../components/InfoMessage';
import Catalog from './catalog';
import { getCategories } from '../../store/actions/categories';

class AddNewThingForm extends React.Component {
  constructor(props) {
    super(props);
    const defaultCategoryId ='1';
    this.state = {
      name: '',
      description: '',
      categoryId: defaultCategoryId,
      file: {},
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onMessageClose = this.onMessageClose.bind(this);

  }

  componentDidMount() {
      store.dispatch(getCategories());
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleChangeFile(event) {
    this.setState({ file: event.target.files[0] })
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, description, categoryId, file } = this.state;
    let formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('categoryId', categoryId);

    axios.post('/api/addnewthing', formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        store.dispatch(addMessage({ messageText: 'New thing is added to your inventory.' }));
      });
  }

  onMessageClose() {
    event.preventDefault();
    store.dispatch(deleteMessage());
  }

  render() {
    let categoryOptons = [];
    this.props.categoryList.forEach((cat, index) => {
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
          <form className="" name="AddNewThingForm" encType="multipart/form-data" onSubmit={this.handleSubmit}>
            <div className="field">
              <div className="control">
                <input className="input" type="text" name="name" required placeholder="Name" autoFocus onChange={this.handleChange} value={this.state.name} />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input className="input" type="text" name="description" required placeholder="Description" onChange={this.handleChange} value={this.state.description} />
              </div>
            </div>
            <div className="field">
              <div className="control is-expanded">
                <div className="select is-fullwidth" name="categoryId" >
                  <select onChange={this.handleChange} value={this.state.categoryId} >
                    {categoryOptons}
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input className="input" type="file" name="file" required onChange={this.handleChangeFile} />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input className="button is-block is-success is-large is-fullwidth" type="submit" value="Add" />
              </div>
            </div>
          </form>
        </div>
        {!isEmpty(this.props.message) &&
          <Infomessage
            text={this.props.message.messageText}
            urlForRedirect='/addnewthing'
            onClose={this.onMessageClose} />
        }
        <Catalog />
      </div>
    );
  };
}

const mapStateToProps = state => ({
  message: state.message,
  categoryList: state.categories,
});

export default connect(mapStateToProps)(AddNewThingForm);