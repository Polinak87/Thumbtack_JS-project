import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';
import store from '../../store/index';
import { getCategories } from '../../store/actions/categories';
import { deleteMessage } from '../../store/actions/message';
import { addNewThing } from  '../../store/actions/addNewThing';
import Hero from '../../components/Hero';
import Infomessage from '../../components/InfoMessage';
import Catalog from './catalog';
import FormField from '../../components/FormField';
import ButtonSubmit from '../../components/ButtonSubmit';


class AddNewThingForm extends React.Component {
  constructor(props) {
    super(props);
    const defaultCategoryId = '1';
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

  handleChange() {
    this.setState({ [event.target.name]: event.target.value });
    console.log('this.state');
    console.log(this.state);
  }

  handleChangeFile(event) {
    this.setState({ file: event.target.files[0] })
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, description, categoryId, file } = this.state;
    store.dispatch(addNewThing(name, description, categoryId, file));
  }

  onMessageClose() {
    event.preventDefault();
    store.dispatch(deleteMessage());
  }

  render() {
    const { categoryList } = this.props;
    let categoryOptons = categoryList.map((cat) => {
      return <option key={cat.id} value={cat.id}>{cat.name} </option> ;
    });

    return (
      <div>
        <br />
        <Hero text='Add new thing to your inventory' type="hero is-primary" />
        <br />
        <div className="column is-one-quarter">
          <form className="" name="AddNewThingForm" encType="multipart/form-data" onSubmit={this.handleSubmit}>
            <FormField type="text" name="name" placeholder="Name" onChange={this.handleChange} value={this.state.name} />
            <FormField type="text" name="description" placeholder="Description" onChange={this.handleChange} value={this.state.description} />
            <FormField type="file" name="file" onChange={this.handleChangeFile} />
            <div className="field">
              <div className="control is-expanded">
                <div className="select is-fullwidth" >
                  <select name="categoryId" onChange={this.handleChange} value={this.state.categoryId} >
                    {categoryOptons}
                  </select>
                </div>
              </div>
            </div>
            <ButtonSubmit value="Add" />
          </form>
        </div>
        <Catalog />
        {!isEmpty(this.props.message) &&
          <Infomessage
            text={this.props.message.messageText}
            urlForRedirect='/addnewthing'
            onClose={this.onMessageClose} />
        }
      </div>
    );
  };
}

const mapStateToProps = state => ({
  message: state.message,
  categoryList: state.categories,
});

export default connect(mapStateToProps)(AddNewThingForm);