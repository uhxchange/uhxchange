import React from 'react';
import { Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Reviews } from '../../api/review/Reviews';

const bridge = new SimpleSchema2Bridge(Reviews.schema);

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class AddReview extends React.Component {

  submit(data, formRef) {
    const { userReview, createdAt } = data;
    const userName = Meteor.user().username;
    Reviews.collection.insert({ userReview, createdAt, userName },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Reviews added successfully', 'success');
          formRef.reset();
        }
      });
  }

  render() {
    let fRef = null;
    const userName = Meteor.user().username;
    return (
      <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
        <Segment>
          <TextField label="Add a review!" name='userReview'/>
          <SubmitField value='Submit'/>
          <ErrorsField/>
          <HiddenField name='userName' value={userName}/>
          <HiddenField name='createdAt' value={new Date()}/>
        </Segment>
      </AutoForm>
    );
  }
}

// Wrap this component in withRouter since we use the <Link> React Router element.
export default AddReview;
