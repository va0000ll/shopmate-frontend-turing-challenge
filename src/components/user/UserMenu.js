import React, { useState, Fragment, useEffect, useContext } from 'react';
import SignUp from '../user/SingUp';
import SignIn from '../user/SignIn';
import UserContext from '../../context/user/userContext';
import { Link } from 'react-router-dom';

const UserMenu = () => {
  let [showUserModal, setUserModal] = useState(null);

  let { isAuthenticated, loading, loadUser, user } = useContext(UserContext);

  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);

  let moveToModal = modal => {
    if (isAuthenticated) {
      return false;
    }
    setUserModal(modal);
  };

  return (
    <div className="user-signin-signup">
      {!isAuthenticated && !loading ? (
        showUserModal === 'up' ? (
          <SignUp onClose={setUserModal} show={showUserModal === 'up'} />
        ) : showUserModal === 'in' ? (
          <SignIn onClose={setUserModal} show={showUserModal === 'in'} />
        ) : null
      ) : null}

      {!isAuthenticated && !loading ? (
        <div className="user-signin-signup">
          <span>Hi! </span>
          <button
            className="btn btn-link text-main p-0"
            onClick={e => moveToModal('in')}
          >
            Sign in
          </button>
          <span> or </span>
          <button
            className="btn btn-link text-main p-0"
            onClick={e => moveToModal('up')}
          >
            Register
          </button>
        </div>
      ) : null}
      {isAuthenticated && !loading ? (
        <Fragment>
          <span>Hi, {user.name}! </span>
          <Link to="/my">My Account</Link>
        </Fragment>
      ) : null}
    </div>
  );
};

export default UserMenu;
