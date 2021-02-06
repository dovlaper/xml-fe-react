import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginSchema } from './validations';

export default function LoginForm({ onSubmit, isPending }) {
  const handleOnSubmit = values => {
    const { email, password } = values;
    onSubmit(email, password);
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={loginSchema}
      onSubmit={handleOnSubmit}
    >
      <Form>
        <div>
          <label htmlFor="email">
            email
          </label>
          <Field type="email" name="email" required autoFocus />
          <ErrorMessage name="email">
            {({defaultMessage}) => defaultMessage }
          </ErrorMessage>
        </div>
        <div>
          <label htmlFor="password">
            Password
          </label>
          <Field type="password" name="password" required />
          <ErrorMessage name="password">
            {({defaultMessage}) => defaultMessage }
          </ErrorMessage>
        </div>
        <button type="submit">
          Login
        </button>
      </Form>
    </Formik>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  isPending: PropTypes.bool
};
