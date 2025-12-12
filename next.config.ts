// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   // Empty config = disable Turbopack warnings + allow Webpack
//   turbopack: {},

//   webpack: (config) => {
//     // Ignore unwanted Remotion files
//     config.module.rules.push({
//       test: /\.(d\.ts|exe|md)$/i,
//       use: "ignore-loader",
//     });

//     // Externals to prevent Next.js from bundling native binaries
//     config.externals.push({
//       "@remotion/compositor-darwin-x64": "commonjs @remotion/compositor-darwin-x64",
//       "@remotion/compositor-darwin-arm64": "commonjs @remotion/compositor-darwin-arm64",
//       "@remotion/compositor-linux-x64-gnu": "commonjs @remotion/compositor-linux-x64-gnu",
//       "@remotion/compositor-linux-x64-musl": "commonjs @remotion/compositor-linux-x64-musl",
//       "@remotion/compositor-linux-arm64-gnu": "commonjs @remotion/compositor-linux-arm64-gnu",
//       "@remotion/compositor-linux-arm64-musl": "commonjs @remotion/compositor-linux-arm64-musl",
//       "@remotion/compositor-win32-x64-msvc": "commonjs @remotion/compositor-win32-x64-msvc",
//     });

//     return config;
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  webpack: (config: Configuration) => {
    //
    // 1️⃣ Normalize externals → always an array
    //
    if (!Array.isArray(config.externals)) {
      config.externals = config.externals ? [config.externals] : [];
    }

    //
    // 2️⃣ Push Remotion native binaries safely
    //
    config.externals.push({
      "@remotion/compositor-win32-x64-msvc":
        "commonjs @remotion/compositor-win32-x64-msvc",
    });

    //
    // 3️⃣ Ignore `.d.ts` files (fix esbuild errors)
    //
    config.module?.rules?.push({
      test: /\.d\.ts$/,
      use: "ignore-loader",
    });

    //
    // 4️⃣ Prevent parsing Remotion's esbuild code
    //
    config.module!.noParse = [
      /node_modules\/esbuild/,
      /node_modules\/@remotion\/bundler/,
    ];

    return config;
  },
  
};

export default nextConfig;
