import React, { useState, useContext } from 'react';
import closeIcon from '../../icons/icons-close-big-black.png';
import FormGroupInput from '../forms/FormGroupInput';

import { toast } from 'react-toastify';
import UserContext from '../../context/user/userContext';

const SingUp = ({ show, onClose }) => {
  let userContext = useContext(UserContext);

  // Init states
  let [user, setUser] = useState({
    name: 'TEWST',
    email: 'e@FS.COM',
    password: '123',
    repassword: '123'
  });

  let [errors, setError] = useState({
    name: false,
    email: false,
    password: false,
    repassword: false
  });

  let { name, email, password, repassword } = user;

  // Handle inputs changes
  let onChange = (name, value) => setUser({ ...user, [name]: value });

  // Close Sing up modal
  let handleClose = () => onClose(null);

  // Switch to Sign in
  let onSignIn = () => onClose('in');

  // handle signup submit
  let onSubmit = e => {
    e.preventDefault();
    let nameReg = /^([a-zA-Z ]{2,30})$/;
    let emailReg = /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]{2,5})$/;
    let error = {
      name: !nameReg.test(name.trim()),
      email: !emailReg.test(email.trim()),
      password: !password,
      repassword: password !== repassword
    };
    setError(error);

    if (error.name) {
      toast('Please enter valid name 2-30 characters');
      return false;
    }

    if (error.email) {
      toast('Please enter valid email');
      return false;
    }
    if (error.password) {
      toast('Please enter password');
      return false;
    }
    if (error.repassword) {
      toast('Password and confirm password does not match');
      return false;
    }

    userContext.register({ name, email: email.toLowerCase(), password });
  };

  return (
    <div className={`modal fade d-block ${show ? 'show' : ''}`} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content border-0 shadow-lg text-center">
          <div className="modal-header border-0 pl-0">
            <h3 className="modal-title font-weight-bold mt-5 pl-5 w-100">
              Sign Up
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
            <form onSubmit={onSubmit} className="for-row">
              <FormGroupInput
                value={name}
                name="name"
                onChange={onChange}
                placeholder="Your name"
                className={errors.name ? 'border-danger' : ''}
              />
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
              <FormGroupInput
                type="password"
                value={repassword}
                name="repassword"
                onChange={onChange}
                placeholder="Re-type password"
                className={errors.repassword ? 'border-danger' : ''}
              />
              <div className="col-12 mt-5 text-center">
                <button type="submit" className="btn btn-primary btn-lg px-5">
                  Sign Up
                </button>
              </div>
            </form>
            <p className="text-black mt-3">
              Already a member?{' '}
              <button className="btn btn-link p-0" onClick={onSignIn}>
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
