import { io } from "socket.io-client";
const URL = "http://localhost:4200";

export const socket = io(URL);
