import axios from "@/lib/axios";
import { createStore } from "vuex";

export default createStore({
  state: {},
  mutations: {},
  actions: {
    async requestDataset() {
      const url =
        "https://frontend-assignments.s3.ap-northeast-2.amazonaws.com/job_postings.json";
      return axios.get(url);
    },
  },
  getters: {},
});
