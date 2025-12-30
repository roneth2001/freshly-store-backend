import axios from "axios";

const API = axios.create({
  baseURL: "http://10.249.149.124:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
