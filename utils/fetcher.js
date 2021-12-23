// https://swr.vercel.app/docs/getting-started
export default async (...args) => {
  const res = await fetch(...args);

  return res.json();
};
