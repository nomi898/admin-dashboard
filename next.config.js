// ...existing code...
module.exports = {
  // ...existing config...
  images: {
    domains: ['localhost'], // Add allowed domains for images
  },
  async redirects() {
    return [
      {
        source: '/Product/Image.svg',
        destination: '/fallback.svg', // Replace with a valid fallback image
        permanent: false,
      },
    ];
  },
};
