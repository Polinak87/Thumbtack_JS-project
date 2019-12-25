import React from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../../../store/actions/main';
import { addNewThing } from '../../../store/actions/things';
import FormField from '../../../components/FormField';
import Select from '../../../components/Select';
import Button, { green, large } from '../../../components/Button';
import FileInput from './FileInput';

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
  }

  componentDidMount() {
    this.props.getCategories();
  }

  handleChange() {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleChangeFile(event) {
    this.setState({ file: event.target.files[0] })
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, description, categoryId, file } = this.state;
    this.props.addNewThing(name, description, categoryId, file);
  }

  render() {
    const { categoryList } = this.props;
    let categoryOptons = categoryList.map((cat) => {
      return <option key={cat.id} value={cat.id}>{cat.name} </option>;
    });

    return (
      <form className="" name="AddNewThingForm" encType="multipart/form-data" onSubmit={this.handleSubmit}>
        <FormField type="text" name="name" placeholder="Name" onChange={this.handleChange} value={this.state.name} />
        <FormField type="text" name="description" placeholder="Description" onChange={this.handleChange} value={this.state.description} />
        <FileInput onChange={this.handleChangeFile} fileName={this.state.file.name} />
        <Select onChange={this.handleChange} value={this.state.categoryId} categoryOptons={categoryOptons} />
        <Button className={large + " " + green} type="submit" value="Add" />
      </form>
    );
  };
}

const mapStateToProps = state => ({
  categoryList: state.main.categories,
});

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(getCategories()),
  addNewThing: (name, description, categoryId, file) => dispatch(addNewThing(name, description, categoryId, file)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewThingForm);