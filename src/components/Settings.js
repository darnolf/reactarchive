import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { getTags, saveTag, deleteTag } from '../actions/tagsActions';

import _ from 'lodash';

class GlobalSettings extends Component {
  componentWillMount() {
    this.props.getTags();
  }



  renderTags() {
    return _.map(this.props.tags, (tag, key) => {
      return (
        <div key={key} className="list-group-item"> 
              {tag.name}
              <button className="btn btn-danger btn-sm float-right" onClick={() => this.props.deleteTag(key)}>X</button>
        </div>
      );
    });
  }

  renderField(field) {
    return (
      <input type="text" placeholder={`Enter a ${field.label}...`} {...field.input} className={field.class}/>
    );
  }

  onSubmit(values) {
    console.log(values)
    this.props.saveTag(values).then(this.props.dispatch(reset('NewTag')));
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container" style={{marginTop: '100px'}}>

        <h1>Tags Manager</h1>

        <div className="card p-3 my-3">
          <h4>Create new tag</h4>
          <div className="form-group">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="form-inline">
              <Field
                name="name"
                component={this.renderField}
                label="tag name"
                class="form-control"
                />
              <button type="submit" className="btn btn-primary" data-toggle="confirmation">Create Tag</button>
            </form>
          </div>
        </div>


        <div className="card p-3">        
          <h4>Available Tags</h4>
          <div className="list-group">
            {this.renderTags()}
          </div>
        </div>
      </div>
    );
  }
}

let form = reduxForm({
  form: 'NewTag'
})(GlobalSettings);

form = connect(state => ({
    tags: state.tags
  }), { saveTag, getTags, deleteTag }
)(form);

export default form;