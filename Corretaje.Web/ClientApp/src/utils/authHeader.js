export function authHeader() {
  let token = localStorage.getItem("Token");
  if (token) {
    return "Bearer " + token;
  }
}
