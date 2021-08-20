import axios from "axios";

function requestService(
  apiEndpoint,
  obj,
  onSuccess,
  setFailedRequest,
  setLoading
) {
  axios
    .post(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/${apiEndpoint}`, obj)
    .then((res) => {
      console.log(res);
      onSuccess && onSuccess();
      setFailedRequest && setFailedRequest(false);
    })
    .catch((err) => {
      console.log("err", err);
      setFailedRequest && setFailedRequest(true);
    })
    .finally(() => setLoading && setLoading(false));
}

export default requestService;
