import { axios } from "@/utils/request";
const api = {
  videoInfo: "/av/", //获取视频详情
  recommend: "/av/recommend/", //获取视频相关推荐
  replay: "/av/replay" //获取视频相关推荐
};

export function getVideoInfo(av) {
  return axios({
    url: api.videoInfo + av,
    type: "get"
  });
}
export function getRecommend(av) {
  return axios({
    url: api.recommend + av,
    type: "get"
  });
}
export function getReply(aId, p) {
  const data = {
    aId,
    p
  };
  console.log(data);
  return axios({
    url: api.replay,
    type: "get",
    params: data
  });
}
export default {
  getVideoInfo,
  getRecommend,
  getReply
};
