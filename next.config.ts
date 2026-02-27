import type { NextConfig } from "next";
import withPlaiceholder from "@plaiceholder/next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {},
};

export default withPlaiceholder(nextConfig);
