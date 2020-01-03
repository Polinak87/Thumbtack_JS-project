import React from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../../../store/actions/main';
import { addNewThing } from '../../../store/actions/things';
import FormFieldText from '../../../components/FormFieldText';
import Select, { fullwidth } from '../../../components/Select';
import Button, { green, large } from '../../../components/Button';
import FormFieldFile from './FormFieldFile';

class AddNewThingForm extends React.Component {
  constructor(props) {
    super(props);
    const defaultCategoryId = '1';
    this.state = {
      name: '',
      description: '',
      categoryId: defaultCategoryId,
      file: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { getCategories } = this.props;
    getCategories();
  }

  onChange() {
    this.setState({ [event.target.name]: event.target.value });
  }

  onChangeFile(event) {
    this.setState({ file: event.target.files[0] });
  }

  onSubmit(event) {
    event.preventDefault();
    const { name, description, categoryId, file } = this.state;
    const { addNewThing } = this.props;
    addNewThing(name, description, categoryId, file);
  }

  render() {
    const { categoryList } = this.props;
    let categoryOptons = categoryList.map(cat => {
      const { id, name } = cat;
      return (
        <option key={id} value={id}>
          {name}
        </option>
      );
    });
    const { name, description, categoryId, file } = this.state;
    const { name: fileName } = file;
    return (
      <form
        className=""
        name="AddNewThingForm"
        encType="multipart/form-data"
        onSubmit={this.onSubmit}
      >
        <FormFieldText
          type="text"
          name="name"
          placeholder="Name"
          onChange={this.onChange}
          value={name}
        />
        <FormFieldText
          type="text"
          name="description"
          placeholder="Description"
          onChange={this.onChange}
          value={description}
        />
        <FormFieldFile onChange={this.onChangeFile} fileName={fileName} />
        <Select
          className={`${green} ${fullwidth}`}
          onChange={this.onChange}
          value={categoryId}
          categoryOptons={categoryOptons}
        />
        <Button className={`${large} ${green}`} type="submit">
          Add
        </Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  categoryList: state.main.categories,
});

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(getCategories()),
  addNewThing: (name, description, categoryId, file) =>
    dispatch(addNewThing(name, description, categoryId, file)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewThingForm);
