module.exports = {
  webpack5: true,

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
