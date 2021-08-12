import axios from "axios";

function interactionService(id, feedbackType) {
  axios
    .post(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/interaction`, {
      id: id,
      feedbackType: feedbackType,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log("err", err);
    });
}

export default interactionService;
