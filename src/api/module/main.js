import { axios } from "@/utils/request";
const api = {
  getRegion: "/index-recommend",
  timeLine: "/time-line", //新番国创每周数据
  rankSeason: "/rank-season" //新番国创排行榜
};

export function getRegion() {
  return axios({
    url: api.getRegion,
    type: "get"
  });
}

export function getTimeLine(types) {
  const data = {
    types
  };
  console.log(data);
  return axios({
    url: api.timeLine,
    type: "get",
    params: data
  });
}
export function getRankSeason(seasonType, day) {
  const data = {
    seasonType,
    day
  };
  return axios({
    url: api.rankSeason,
    type: "get",
    params: data
  });
}

export default {
  getRegion,
  getTimeLine,
  getRankSeason
};
