// const serverIP = "regcompliance-demo.westeurope.cloudapp.azure.com";
//const serverIP = "regcompliance-demo.westeurope.cloudapp.azure.com";
// const serverIP = "regcompliance-dev.azurewebsites.net";
const serverIP = "localhost";
const serverPort = "8081";
const clientPort = "8000";
const serverMethod = "http";
// const serverMethod = "https";

const baseURL = serverPort
  ? `${serverMethod}://${serverIP}:${serverPort}`
  : `${serverMethod}://${serverIP}`;

const clientURL = clientPort
  ? `${serverMethod}://${serverIP}:${clientPort}`
  : `${serverMethod}://${serverIP}`;

export { baseURL, clientURL, serverIP, serverPort, serverMethod };
