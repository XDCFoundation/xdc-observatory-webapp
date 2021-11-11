

import axios from "axios";
export default class AwsService {

async  updateUser(requestData) {

  let url = "https://lmeqebp7fj.execute-api.us-east-1.amazonaws.com/testnet/upload-file"
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    //  "Authorization" : `Bearer ${utility.getAccessToken()}`
    },
  };
  return axios
    .post(url, requestData, config)
    .then((data) => {
      if (
              !data ||

        !data.data ||

        !data.data.responseData ||

        !data.data.success

      ) {

        return;

      }

      // this.returnResponseToParentComponent(data.data)

      return data.data.responseData;

    })

    .catch((err) => {

      // Utils.apiFailureToast(err && err.message || "Unable to upload selected file")

      console.log(err);

    });
}
}