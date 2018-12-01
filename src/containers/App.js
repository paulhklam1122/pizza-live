import React, { Component } from 'react'

import '../App.scss'

import { Button, Card, Icon, Image, Input, Segment } from 'semantic-ui-react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Layout } from '../components'

const pizzaData = Array(4).fill(0).map((a, index) => ({
  name: `pizza${index}`,
  imageURL: 'http://lucapizza.ca/wp-content/uploads/2015/05/Canadian-Pizza.jpg',
  price: 10 + index
}))

const schema = Yup.object().shape({
  firstName: Yup.string()
  .min(5, 'name should have a minimum of 5 characters')
  .required('this field is required'),
  lastName: Yup.string()
  .min(5, 'name should have a minimum of 5 characters')
  .required('this field is required'),
  address: Yup.string()
  .min(5, 'name should have a minimum of 5 characters')
  .required('this field is required'),
  phone: Yup.number()
  .positive("the phone number can't be a negative number")
  .required()
})

class App extends Component {
  state = {
    order: {},
    total: 0
  }

  handleClick = (pizza, type) => {
    let { order, total } = this.state
    const { name, price } = pizza

    if (type === 'plus') {
      order[name] === undefined ? order[name] = 1 : order[name] = order[name] + 1
      total = total + price
    } else {
      order[name] === undefined ? order[name] = 1 : order[name] = order[name] - 1
      total = total - price
    }

    this.setState({pizza, total})
  }

  render() {
    console.log(this.state)
    const { order } = this.state
    return (
      <div className="App">
        <Layout>
          <div style={{ color: 'white' }}>
            <Card.Group>
              {
                pizzaData.map(pizza => {
                  return (
                    <Card key={pizza.name}>
                      <Image src={pizza.imageURL} />
                      <Card.Content>
                        <Card.Header>{pizza.name}</Card.Header>
                        <Card.Description>
                          <Button.Group>
                            <Button color='orange' onClick={() => this.handleClick(pizza, 'plus')}><Icon name='add'/></Button>
                            <Button.Or text={this.state.order[pizza.name] || 0} />
                            <Button color='orange' onClick={() => this.handleClick(pizza, 'minus')} disabled={order[pizza.name] === undefined || order[pizza.name] === 0}><Icon name='minus'/></Button>
                          </Button.Group>
                        </Card.Description>
                        <Card.Description>Paul is a great guitarist from Vancouver.</Card.Description>
                      </Card.Content>
                    </Card>
                  )
                })
              }
            </Card.Group>
            <Segment style={{ color: 'black' }}>
              <Formik
                initialValues= {{
                  firstName: this.props.name || '',
                  lastName: '',
                  address: '',
                  phone: ''
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2))
                    setSubmitting(false)
                  }, 1000)
                }}
                validationSchema={schema}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Field name='firstName'>
                      {({field, form}) => (
                        <div className='form-input'>
                          <Input icon='sass' iconPosition='left' type='text' {...field} placeholder='John' />
                          {
                            form.touched[field.name] &&
                            form.errors[field.name] &&
                            <div className='error'>{form.errors[field.name]}</div>
                          }
                        </div>
                      )}
                    </Field>
                    <Field name='lastName'>
                      {({field, form}) => (
                        <div className='form-input'>
                          <Input icon='user' iconPosition='left' type='text' {...field} placeholder='Doe' />
                          {
                            form.touched[field.name] &&
                            form.errors[field.name] &&
                            <div className='error'>{form.errors[field.name]}</div>
                          }
                        </div>
                      )}
                    </Field>
                    <Field name='address'>
                      {({field, form}) => (
                        <div className='form-input'>
                          <Input icon='address card' iconPosition='left' type='text' {...field} placeholder='123 Seasame St' />
                          {
                            form.touched[field.name] &&
                            form.errors[field.name] &&
                            <div className='error'>{form.errors[field.name]}</div>
                          }
                        </div>
                      )}
                    </Field>
                    <Button disabled={isSubmitting} type='submit' content='Send'></Button>
                  </Form>
                )}
              </Formik>
            </Segment>
          </div>
        </Layout>
      </div>
    )
  }
}

export default App


