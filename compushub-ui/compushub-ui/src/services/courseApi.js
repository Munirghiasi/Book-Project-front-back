import axios from "axios";

// Backend URL lives here so components only deal with displaying data.
const API_URL = "http://localhost:8080/api/v1/courses";

export function getCourses() {
  return axios.get(API_URL);
}
