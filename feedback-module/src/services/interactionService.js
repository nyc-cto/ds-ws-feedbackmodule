import axios from "axios";

function interactionService(obj, final) {
  axios
    .post(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/interaction`, obj)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log("err", err);
    })
    .finally(() => {
      final();
    });
}

export default interactionService;
