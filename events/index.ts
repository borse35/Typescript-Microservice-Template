import http from "http";


export  = (server: http.Server) => {
  require('./closeServer').default(server); // register event listeners to close servers
};