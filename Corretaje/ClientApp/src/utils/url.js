/** @format */

const urlService = //"https://localhost:44378";
 window.location.hostname.includes("dev.propins.cl") ||
  window.location.hostname.includes("localhost")
  ? "https://apidev.propins.cl"
  : window.location.hostname.includes("admin.propins.cl") ||
  window.location.hostname.includes("adm.propins.cl")
 ? "https://api.propins.cl"  : "https://apitest.propins.cl";

export { urlService };
