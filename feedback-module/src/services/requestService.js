import axios from "axios";

const requestService = (apiEndpoint, obj) => {
  axios
    .post(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/${apiEndpoint}`, obj)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export default requestService;
