import { defaultI18n } from "fecha";
import http from "../http-common";

class VHSDataService {
  getAll() {
    return http.get("/vhs");
  }

  get(id) {
    return http.get(`/vhs/${id}`);
  }

  create(data) {
    return http.post("/vhs", data);
  }

  update(id, data) {
    return http.put(`/vhs/${id}`, data);
  }

  delete(id) {
    return http.delete(`/vhs/${id}`);
  }

  findByTitle(title) {
    return http.get(`/vhs?title=${title}`);
  }
}

export default new VHSDataService();
