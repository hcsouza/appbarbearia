import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333'
});

export default api;

//  android com emulador: localhost após no terminal - adb reverse tcp:3334 tcp:3334
//  android com emulador: 10.0.0.2 (emulador Android studio)