export function authHeader() {
  // return authorization header with jwt token
  // let jsonUser = localStorage.getItem("user");

  // if (
  //   jsonUser &&
  //   /^[\],:{}\s]*$/.test(
  //     jsonUser
  //       .replace(/\\["\\\/bfnrtu]/g, "@")
  //       .replace(
  //         /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
  //         "]"
  //       )
  //       .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
  //   )
  // ) {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user && user.Token) {
    return "Bearer " + user.Token;
  } else {
    return null;
  }
  //   } else {
  //     localStorage.removeItem("user");
  //     return;
  //   }
}
