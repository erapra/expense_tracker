export default function fetchUsersList() {
  if (
    localStorage.getItem("users") &&
    JSON.stringify(localStorage.getItem("users"))
  ) {
    return JSON.parse(localStorage.getItem("users"));
  } else {
    const user = { userId: "admin", password: "password" };
    localStorage.setItem("users", JSON.stringify([user]));
    return JSON.parse(localStorage.getItem("users"));
  }
}
