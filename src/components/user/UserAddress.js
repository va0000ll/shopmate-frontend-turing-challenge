import React, { useState, useContext, useEffect } from 'react';
import FormGroupInput from '../forms/FormGroupInput';
import UserContext from '../../context/user/userContext';
import { toast } from 'react-toastify';

const UserAddress = () => {
  // Bring UserContext
  let { user, updateAddress } = useContext(UserContext);

  // Init state
  let [address, setAddress] = useState({
    address_1: '',
    address_2: '',
    city: '',
    region: '',
    postal_code: '',
    country: '',
    shipping_region_id: ''
  });

  let { address_1, address_2, city, region, postal_code, country } = address;

  useEffect(() => {
    if (user) {
      setAddress({
        address_1: user.address_1 || '',
        address_2: user.address_2 || '',
        city: user.city || '',
        region: user.region || '',
        postal_code: user.postal_code || '',
        country: user.country || '',
        shipping_region_id: user.shipping_region_id || ''
      });
    }
  }, [user]);

  let onChange = (name, value) => setAddress({ ...address, [name]: value });

  let onSubmit = e => {
    e.preventDefault();
    if (!address_1 || !city || !region || !postal_code || !country) {
      toast('Please fill all inputs market with *', { type: 'error' });
      return false;
    }

    updateAddress(address);
  };

  return (
    <div className="tab-pane fade show active">
      <h4 className="mb-4 text-center">Update Adress</h4>
      <div className="row">
        <form className="col-md-8 mx-auto" onSubmit={onSubmit}>
          <FormGroupInput
            name="address_1"
            value={address_1}
            onChange={onChange}
            placeholder="Address 1"
            label="Address 1"
            required
          />
          <FormGroupInput
            name="address_2"
            value={address_2}
            onChange={onChange}
            placeholder="address 2 (optional)"
            label="Address 2"
          />
          <FormGroupInput
            name="city"
            value={city}
            onChange={onChange}
            className="form-control-lg py-3"
            placeholder="City"
            label="City"
            required
          />
          <FormGroupInput
            name="region"
            value={region}
            onChange={onChange}
            className="form-control-lg py-3"
            placeholder="Region"
            label="Region"
            required
          />
          <FormGroupInput
            name="postal_code"
            value={postal_code}
            onChange={onChange}
            className="form-control-lg py-3"
            placeholder="Postal code"
            label="Postal code"
            required
          />
          {/* It should be select element */}
          <FormGroupInput
            name="country"
            value={country}
            onChange={onChange}
            className="form-control-lg py-3"
            placeholder="Country"
            label="Country"
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

export default UserAddress;
