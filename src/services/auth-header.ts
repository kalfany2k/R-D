export default function authHeader() {
  const useStr = localStorage.getItem("token");
  let user = null;
  if (useStr) user = JSON.parse(useStr);
  if (user && user.accessToken) {
    return { Authroization: "Bearer " + user.accessToken };
  } else {
    return { Authorization: "" };
  }
}
