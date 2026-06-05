import type { NextConfig } from "next";

// When building for GitHub Pages (project site at /<repo>), serve assets and
// routes under the repo sub-path. Set GITHUB_PAGES=true in CI; local dev and
// the Azure build leave it unset and run from the root.
const basePath = process.env.GITHUB_PAGES === "true" ? "/D8A-website" : undefined;

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;
