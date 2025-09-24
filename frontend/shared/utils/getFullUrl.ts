const getFullUrl = (relativePath: string) => {
   const url = new URL(relativePath, import.meta.env.VITE_API_URL);
   url.port = import.meta.env.VITE_API_PORT.toString();
   return url;
};

export default getFullUrl;
