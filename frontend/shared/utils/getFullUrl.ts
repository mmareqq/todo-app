const getFullUrl = (relativePath: string) => {
   const url = new URL(relativePath, import.meta.env.VITE_API_URL);
   return url.toString();
};

export default getFullUrl;
