// https://swr.vercel.app/docs/getting-started
// export default async (...args) => {
//   const res = await fetch(...args);
//   return res.json();
// };

export default async (url, token) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin'
  });

  return res.json();
};
