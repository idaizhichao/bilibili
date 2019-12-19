import { axios } from "@/utils/request";
const api = {
  card: "/card"
};

export function getCardInfo(mid) {
  return axios({
    url: api.card + "?mid=" + mid,
    type: "get"
  });
}
export default {
  getCardInfo
};
