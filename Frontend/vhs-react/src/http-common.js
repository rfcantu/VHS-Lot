import axios from "axios";

export default axios.create({
  // Change this to server URL when putting on site
  baseURL: "http://localhost:8080/api",
  header: {
    "Content-type": "application/json",
  },
});
