import axios from "axios";

const marvel = axios.create({
  baseURL: process.env.MARVEL_URL,
});

export default marvel;