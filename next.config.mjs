/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',  // Redirect from the root URL ("/")
          destination: '/inventory',  // Redirect to "/inventory"
          permanent: true,  // Set to true for a 301 (permanent) redirect
        },
      ];
    },
  };
  
  export default nextConfig;
  
