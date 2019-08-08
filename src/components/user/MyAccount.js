import React, { useState, useContext, Fragment } from 'react';
import UserInfo from './UserInfo';
import UserContext from '../../context/user/userContext';
import TabBtn from './TabBtn';
import Spinner from '../layout/Spinner';
import { Redirect } from 'react-router-dom';
import UserAddress from './UserAddress';
import UserOrders from './UserOrders';

const MyAccount = () => {
  let { logout, loading, isAuthenticated } = useContext(UserContext);

  //Init state
  let [currentTab, setTab] = useState('info');

  let onTabChange = tab => setTab(tab);

  let tabs = [
    {
      text: 'My Information',
      key: 'info'
    },
    {
      text: 'Address',
      key: 'address'
    },
    {
      text: 'Orders',
      key: 'orders'
    }
  ];

  let tabsBtns = tabs.map(tab => (
    <TabBtn
      onClick={onTabChange}
      active={currentTab === tab.key}
      tabKey={tab.key}
      key={tab.key}
      text={tab.text}
    />
  ));

  return (
    <div className="container my-3">
      <div className="py-4 px-5 bg-white my-account-wrapper">
        {loading ? (
          <Spinner />
        ) : !isAuthenticated ? (
          <Redirect to="/" />
        ) : (
          <Fragment>
            <h2 className="mb-5">My Account</h2>

            <div className="my-account-content">
              <div className="row">
                <div className="col-3">
                  <div className="nav flex-column nav-pills">
                    {tabsBtns}
                    <button
                      type="button"
                      className="nav-link btn btn-primary mt-3"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
                <div className="col-9">
                  <div className="tab-content">
                    {currentTab === 'info' && <UserInfo />}
                    {currentTab === 'address' && <UserAddress />}
                    {currentTab === 'orders' && <UserOrders />}
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
