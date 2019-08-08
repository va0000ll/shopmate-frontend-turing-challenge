import axios from 'axios';

let setToken = token => {
  if (token) {
    axios.defaults.headers.common['USER-KEY'] = token;
  } else {
    delete axios.defaults.headers.common['USER-KEY'];
  }
};

export default setToken;
