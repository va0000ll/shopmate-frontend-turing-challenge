import React, { useState, useContext, useEffect } from 'react';
import FormGroupInput from '../forms/FormGroupInput';
import UserContext from '../../context/user/userContext';
import { toast } from 'react-toastify';

const UserInfo = () => {
  // Bring UserContext
  let { user, updateInfo } = useContext(UserContext);

  // Init state
  let [info, setInfo] = useState({
    name: '',
    email: '',
    password: '',
    day_phone: '',
    eve_phone: '',
    mob_phone: ''
  });

  let [errors, setError] = useState({
    name: false,
    email: false
  });

  let { name, email, password, day_phone, eve_phone, mob_phone } = info;

  useEffect(() => {
    if (user) {
      setInfo({
        name: user.name,
        email: user.email,
        password: '',
        day_phone: user.day_phone || '',
        eve_phone: user.eve_phone || '',
        mob_phone: user.mob_phone || ''
      });
    }
  }, [user]);

  let onChange = (name, value) => setInfo({ ...info, [name]: value });

  // Submit handle
  let onSubmit = e => {
    e.preventDefault();
    let nameReg = /^([a-zA-Z ]{2,30})$/;
    let emailReg = /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]{2,5})$/;
    let error = {
      name: !nameReg.test(name.trim()),
      email: !emailReg.test(email.trim())
    };
    setError(error);

    if (error.name) {
      toast('Please enter valid name 2-30 characters', { type: 'error' });
      return false;
    }

    if (error.email) {
      toast('Please enter valid email', { type: 'error' });
      return false;
    }

    updateInfo(info);
  };

  return (
    <div className="tab-pane fade show active">
      <h4 className="mb-4 text-center">Update Account Information</h4>
      <div className="row">
        <form className="col-md-8 mx-auto" onSubmit={onSubmit}>
          <FormGroupInput
            name="name"
            value={name}
            onChange={onChange}
            className={`form-control-lg py-3 ${
              errors.name ? 'border-danger' : ''
            }`}
            placeholder="Your name"
            label="Name"
          />
          <FormGroupInput
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            className={`form-control-lg py-3 ${
              errors.email ? 'border-danger' : ''
            }`}
            placeholder="Your email"
            label="Email"
          />
          <FormGroupInput
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            className="form-control-lg py-3"
            placeholder="If You want to update Your password enter it"
            label="Password"
          />
          <FormGroupInput
            name="day_phone"
            value={day_phone}
            onChange={onChange}
            className="form-control-lg py-3"
            placeholder="Your day phone"
            label="Day phone"
          />
          <FormGroupInput
            name="eve_phone"
            value={eve_phone}
            onChange={onChange}
            className="form-control-lg py-3"
            placeholder="Your evening phone"
            label="Evening phone"
          />
          <FormGroupInput
            name="mob_phone"
            value={mob_phone}
            onChange={onChange}
            className="form-control-lg py-3"
            placeholder="Your mobile phone"
            label="Mobile phone"
          />
          <div className="mt-5">
            <button type="submit" className="btn btn-block btn-primary py-2">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
