let authHeader = {};
const setAuthHeader = (id, token) =>
  Object.assign(authHeader, { "x-auth-id": id, "x-auth-token": token });

export { authHeader, setAuthHeader };