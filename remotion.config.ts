// import { Config } from "@remotion/cli/config";

// // 🚫 Prevent bundler from copying /public folder
// Config.setPublicDir(null);

// // (Optional) Fix for Next.js FS warnings
// Config.overrideWebpackConfig((current) => {
//   return {
//     ...current,
//     resolve: {
//       ...current.resolve,
//       fallback: {
//         fs: false,
//         path: false,
//       },
//     },
//   };
// });


import { Config } from "@remotion/cli/config";

// Prevent Remotion from copying Next.js /public
Config.setPublicDir(null);

// Fix FS issues inside Next.js
Config.overrideWebpackConfig((current) => ({
  ...current,
  resolve: {
    ...current.resolve,
    fallback: {
      fs: false,
      path: false,
    },
  },
}));
