import axios from "axios";

const baseUrl = "http://localhost:10180/api/";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  dCandidate(url = baseUrl + "DCandidate/") {
    return {
      fetchAll: () => axios.get(url),
      fetchById: (id) => axios.get(id, url + id),
      update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
      delete: (id) => axios.delete(url + id),
      create: (newRecord) => axios.post(url, newRecord),
    };
  },
};
