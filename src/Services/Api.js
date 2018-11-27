import axios from "axios";
import backend from "./backend";
import fileDownload from "js-file-download";
const API = axios.create({
  baseURL: backend,
  crossDomain: true,
  headers: {
    "Content-Type": "application/json"
  }
});

API.interceptors.request.use(
  function(config) {
    if (localStorage.getItem("token")) {
      config.headers.Authorization = localStorage.getItem("token");
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

function getFile(response) {
  let blob = new Blob([response.data]);
  let link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = response.headers["content-disposition"];
  link.click();
}

export { getFile };
export default API;
