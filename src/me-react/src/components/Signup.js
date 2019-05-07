import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { replace } from 'lodash';

const initialValues = {
  name: '',
  email: '',
  age: '',
  password: '',
  passwordConfirmation: '',
};

const signUpSchema = Yup.object().shape({
  name: Yup
    .string()
    .typeError('Only normal characters allowed')
    .required('Required'),
  email: Yup
    .string()
    .min(2, 'Too short!')
    .typeError('Only normal characters allowed')
    .required('Required'),
  age: Yup
    .number()
    .required('Required'),
  password: Yup
    .string()
    .min(2, 'Too short!')
    .typeError('Only normal characters allowed')
    .required('Required'),
  passwordConfirmation: Yup
    .string()
    .min(2, 'Too short!')
    .typeError('Only normal characters allowed')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const formatInput = input => replace(input.trim(), /"/g, "'");

const Signup = ({ handleSignup, history }) => (
  <div className="signup">
    <h1>Sign Up</h1>
    <Formik
      initialValues={initialValues}
      validationSchema={signUpSchema}
      onSubmit={({ email, age, password, name }, { resetForm, setSubmitting }) => {
        const firstName = formatInput(name);
        handleSignup({ email, age, password, firstName });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off" className="form">
          <div className="form-inner-container">
            <div className="field">
              <Field
                id="name"
                type="text"
                name="name"
                component="input"
                className="form-input"
                placeholder="First Name"
              />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>
            <div className="field">
              <Field
                type="email"
                name="email"
                component="input"
                className="form-input"
                placeholder="Email"
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="field">
              <Field
                type="text"
                name="age"
                component="input"
                className="form-input"
                placeholder="Age"
              />
              <ErrorMessage name="age" component="div" className="error-message" />
            </div>
            <div className="field">
              <Field
                type="password"
                name="password"
                component="input"
                className="form-input"
                placeholder="Password"
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <div className="field">
              <Field
                type="password"
                name="passwordConfirmation"
                component="input"
                className="form-input"
                placeholder="Confirm Password"
              />
              <ErrorMessage name="passwordConfirmation" component="div" className="error-message" />
            </div>
            <button type="submit" className="black">
              {isSubmitting ? 'Loading' : 'Sign Up'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);

export default Signup;
