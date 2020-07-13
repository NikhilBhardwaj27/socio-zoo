import axios from "axios";

const setToken = (token) => {
  if (token) {
    axios.defaults.headers.common["authorization"] = token;
  } else {
    delete axios.defaults.headers.common["authorization"];
  }
};

export default setToken;
