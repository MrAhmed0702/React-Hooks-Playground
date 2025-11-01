export const api = async (username, signal) => {
  const URL = `https://api.github.com/users/${username}`;
  const response = await fetch(URL, { signal });
  const data = await response.json();
  return data;
};
