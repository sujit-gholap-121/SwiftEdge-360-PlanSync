/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    serverActions: true,
    forceSwcTransforms: true
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false
      };
    }

    config.module = {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.js$/,
          include: /node_modules\/undici/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-private-property-in-object']
            }
          }
        }
      ]
    };

    return config;
  },
  transpilePackages: ['undici'],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  output: 'standalone',
  poweredByHeader: false,
};

module.exports = nextConfig;