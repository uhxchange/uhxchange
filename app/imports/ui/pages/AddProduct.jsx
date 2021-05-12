import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Products } from '../../api/product/Products';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  productName: String,
  productImage: String,
  description: String,
  saleType: { type: String, allowedValues: ['Selling', 'Trading', 'Both'] },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddProduct extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { productName, productImage, description, saleType } = data;
    const owner = Meteor.user().username;
    Products.collection.insert({ productName, productImage, description, saleType, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid id='sell-page' container centered>
        <Grid.Column>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField id='sell-item-name' name='productName'/>
              <TextField id='sell-item-image' name='productImage'/>
              <LongTextField id='sell-item-description' name='description'/>
              <SubmitField id='sell-item-submit' value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddProduct;
