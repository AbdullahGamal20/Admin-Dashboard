let user;
let token;

if (localStorage.getItem("user")) {
  user = JSON.parse(localStorage.getItem("user"));
  token = user.token;
}

export const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  },
};
