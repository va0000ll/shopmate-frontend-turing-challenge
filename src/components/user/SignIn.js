import React, { useState, useContext } from 'react';
import closeIcon from '../../icons/icons-close-big-black.png';
import FormGroupInput from '../forms/FormGroupInput';
import FormCustomCheckbox from '../forms/FormCustomCheckbox';
import { toast } from 'react-toastify';
import UserContext from '../../context/user/userContext';

const SignIn = ({ show, onClose }) => {
  let userContext = useContext(UserContext);
  // Init state values
  let [user, setUser] = useState({
    email: '',
    password: '',
    remember: false
  });

  let [errors, setError] = useState({
    name: false,
    email: false,
    password: false,
    repassword: false
  });

  // destructuring from user
  let { email, password, remember } = user;

  // Handle inputs changes
  let onChange = (name, value) => setUser({ ...user, [name]: value });

  // Close Sing up modal
  let handleClose = () => onClose(null);

  // Switch to Sign in
  let onSignUp = () => onClose('up');

  // Switch to forgot password
  let onForgotPassword = () => onClose('forgotpassword');

  // handle submit
  let onSubmit = e => {
    e.preventDefault();
    let emailReg = /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]{2,5})$/;
    let error = {
      email: !emailReg.test(email.trim()),
      password: !password
    };
    setError(error);

    if (error.email) {
      toast('Please enter valid email');
      return false;
    }
    if (error.password) {
      toast('Please enter password');
      return false;
    }

    userContext.login({ email: email.toLowerCase(), password });
  };

  return (
    <div className={`modal fade d-block ${show ? 'show' : ''}`} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content border-0 shadow-lg text-center">
          <div className="modal-header border-0 pl-0">
            <h3 className="modal-title font-weight-bold mt-5 pl-5 w-100">
              Sign In
            </h3>
            <button
              type="button"
              className="close p-0"
              data-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            >
              <img src={closeIcon} alt="" />
            </button>
          </div>
          <div className="modal-body px-5">
            <form onSubmit={onSubmit}>
              <FormGroupInput
                type="email"
                value={email}
                name="email"
                onChange={onChange}
                placeholder="Email"
                className={errors.email ? 'border-danger' : ''}
              />
              <FormGroupInput
                type="password"
                value={password}
                name="password"
                onChange={onChange}
                placeholder="Password"
                className={errors.password ? 'border-danger' : ''}
              />
              <FormCustomCheckbox
                name="remember"
                label="Remember"
                id="remember"
                onChange={onChange}
                checked={remember}
              />
              <div className="mt-4 text-center">
                <button type="submit" className="btn btn-primary btn-lg px-5">
                  Sign In
                </button>
              </div>
            </form>
            <div className="d-flex flex-row justify-content-between mt-4">
              <button className="btn btn-link p-0" onClick={onForgotPassword}>
                Forgot password
              </button>
              <button className="btn btn-link p-0" onClick={onSignUp}>
                Doesn't have an account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
