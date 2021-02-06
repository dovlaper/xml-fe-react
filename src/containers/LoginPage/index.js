import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { makeSelectIsLoginPending } from './selectors';
import { login } from './actions';
import LoginForm from './LoginForm';
import reducer from './reducer';
import saga from './saga';
import { REGISTER, FORGOT_PASSWORD } from '../../routes';

const key = 'login';

function LoginPage() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const dispatch = useDispatch();
  const isLoginPending = useSelector(makeSelectIsLoginPending());
  const submitLoginForm = useCallback((...args) => dispatch(login(...args)), [
    dispatch
  ]);


  const renderPendingIndicator = <div>Please wait...</div>;

  return (
    <main>
      <title>Login - XML</title>
      <h1 style={{marginLeft:'45%'}}>Login</h1>
        <>
       
          <LoginForm onSubmit={submitLoginForm} isPending={isLoginPending} />
        </>
    </main>
  );
}

export default LoginPage;
