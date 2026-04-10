if (typeof require.resolveWeak !== "function") {
  require.resolveWeak = require.resolve;
}

try {
  const bundler = require("@docusaurus/bundler");

  if (bundler && typeof bundler.getProgressBarPlugin === "function") {
    const originalGetProgressBarPlugin = bundler.getProgressBarPlugin;

    bundler.getProgressBarPlugin = async function patchedGetProgressBarPlugin(
      args,
    ) {
      if (args?.currentBundler?.name === "rspack") {
        return originalGetProgressBarPlugin(args);
      }

      const webpack = args?.currentBundler?.instance;
      if (!webpack || typeof webpack.ProgressPlugin !== "function") {
        return originalGetProgressBarPlugin(args);
      }

      return class CompatibleProgressPlugin extends webpack.ProgressPlugin {
        constructor() {
          super({ profile: false });
        }
      };
    };
  }
} catch (_error) {
  // Ignore if bundler isn't available yet.
}
