import { axios } from "@/utils/request";
const api = {
  regionDynamic: "/region-dynamic"
};

export function getRegionDynamic(rId, ps) {
  const data = {
    rId,
    ps
  };
  return axios({
    url: api.regionDynamic,
    type: "get",
    params: data
  });
}
export default {
  getRegionDynamic
};
