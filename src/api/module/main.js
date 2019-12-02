import { axios } from "@/utils/request";
const api = {
  getRegion: "/index-recommend"
};

export function getRegion() {
  return axios({
    url: api.getRegion,
    type: "get"
  });
}
export default {
  getRegion
};
