import { axios } from "@/utils/request";
const api = {
  getRegion: "ranking/region" //分类排行
};

export function getRegion(rId, day = 3) {
  const data = {
    rId,
    day
  };
  return axios({
    url: api.getRegion,
    type: "get",
    params: data
  });
}
export default {
  getRegion
};
