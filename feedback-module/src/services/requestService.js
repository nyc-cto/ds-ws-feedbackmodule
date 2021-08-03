import axios from "axios";

async function requestService(apiEndpoint, obj) {
  let response = "";

  await axios
    .post(`.${process.env.REACT_APP_BACKEND_ENDPOINT}/api/${apiEndpoint}`, obj)
    .then((res) => {
      console.log(res), (response = "success");
    })
    .catch((err) => {
      console.log(err), (response = "failure");
    });
  return response;
}

export default requestService;
