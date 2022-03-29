module.exports = {
  webpack5: true,
  images: {
    domains: ["ipfs.io", "ipfs.pixura.io"],
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      stream: false,
      crypto: false,
      http: false,
      https: false,
      os: false,
    }

    return config
  },
}
