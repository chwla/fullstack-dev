// api/index.js
export const getPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) throw new Error('Failed to fetch posts');
  return await response.json();
};

export const getRandomuser = async () => {
  const response = await fetch('https://randomuser.me/api/');
  if (!response.ok) throw new Error('Failed to fetch user');
  return await response.json();
};
