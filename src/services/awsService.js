import axios from "axios";
export default class AwsService {
  async updateUser(requestData) {
    let url = process.env.REACT_APP_AWS_FILE_UPLPOADER;
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        //  "Authorization" : `Bearer ${utility.getAccessToken()}`
        "X-API-key": process.env.REACT_APP_X_API_KEY,
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
      });
  }
}
