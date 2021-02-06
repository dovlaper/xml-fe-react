import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginSchema } from './validations';
import styled from 'styled-components';

const StyledInput = styled.span`
    margin-left: 10px;
`

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
      <Form style={{marginLeft: "40%"}}>
        <div style={{display: 'inline-flex'}}>
          <label htmlFor="email">
            email
          </label>
          <StyledInput>
          <Field type="email" name="email" required autoFocus />

          </StyledInput>
          <ErrorMessage name="email">
            {({defaultMessage}) => defaultMessage }
          </ErrorMessage>
        </div>
        <div>
          <label htmlFor="password">
            Password
          </label>
          <StyledInput>
            <Field type="password" name="password" required />

          </StyledInput>
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
