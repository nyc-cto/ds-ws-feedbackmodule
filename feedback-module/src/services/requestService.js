import axios from "axios";

function requestService(
  apiEndpoint,
  obj,
  successCallback,
  failureCallback,
  final
) {
  console.log("request");
  axios
    .post(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/${apiEndpoint}`, obj)
    .then((res) => {
      console.log(res);
      successCallback();
    })
    .catch((err) => {
      console.log(err);
      failureCallback();
    })
    .finally(final);
}

export default requestService;
