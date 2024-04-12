/** @type {import('next').NextConfig} */

// import * as process from "next";
import dotenv from 'dotenv';
import withPlugins from 'next-compose-plugins';
// require("dotenv").config();
// const withPlugins = require("next-compose-plugins");
dotenv.config();

/*const nextConfig = {
  reactStrictMode: false,
  env :{
    API_BASE_URL : process.env.API_BASE_URL
  }
};

export default nextConfig;*/

export default withPlugins([
  {
    reactStrictMode: false,
    env :{
      API_BASE_URL : process.env.API_BASE_URL,
      APP_TYPE : process.env.APP_TYPE,
      ALLOW_UN_ACTIVE_USER_LOGIN : process.env.ALLOW_UN_ACTIVE_USER_LOGIN,
    }
  }
])
