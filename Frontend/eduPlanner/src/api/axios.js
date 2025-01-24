import axios from "axios";

const api  = axios.create({
  baseURL: "https://eduplanner.fly.dev/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

