import axios from "axios";

import { AZURE_ENDPOINT } from "../assets/constants";

const requestService = (apiEndpoint, obj) => {
  axios
    .post(`${AZURE_ENDPOINT}/api/${apiEndpoint}`, obj)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export default requestService;
