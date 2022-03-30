const urlService = //"https://localhost:44378/";
 window.location.hostname.includes("dev.propins.cl") ||
  window.location.hostname.includes("localhost")
 ? "https://apidev.propins.cl"
   : "https://api.propins.cl";

export { urlService };
