  import path from "node:path";                                                                                                            
  import type { NextConfig } from "next";                                                                                                  
                                                                                                                                           
const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: process.cwd(),
  },
    typescript: {                                                                                                                          
      ignoreBuildErrors: true,                                                                                                             
    },                                                                                                                                     
    images: {                                                                                                                              
      unoptimized: true,                                                                                                                   
    },                                                                                                                                     
  };                                                                                                                                       
                                                                                                                                           
  export default nextConfig; 
