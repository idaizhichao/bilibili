import { axios } from "@/utils/request";
const api = {
  videoInfo: "/av/"
};

export function getVideoInfo(av) {
  return axios({
    url: api.videoInfo + av,
    type: "get"
  });
}
export default {
  getVideoInfo
};
