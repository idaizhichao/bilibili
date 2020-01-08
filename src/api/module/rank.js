import { axios } from "@/utils/request";
const api = {
  getRegion: "ranking/region", //分类排行
  getRankingById: "ranking", //根据rid 查询排行榜
  getRankingPartitions: "ranking/partitions" //根据rid 查询排行榜
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

export function getRankingById(rId, day = 3) {
  return axios({
    url: `${api.getRankingById}/${rId}/${day}`
  });
}
export function getRankingPartitions() {
  return axios({
    url: api.getRankingPartitions
  });
}
export default {
  getRegion,
  getRankingById,
  getRankingPartitions
};
