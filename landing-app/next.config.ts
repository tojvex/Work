  import path from "node:path";                                                                                                            
  import type { NextConfig } from "next";                                                                                                  
                                                                                                                                           
  const nextConfig: NextConfig = {                                                                                                         
    turbopack: {                                                                                                                           
      root: path.dirname(process.cwd()),                                                                                                   
    },                                                                                                                                     
    typescript: {                                                                                                                          
      ignoreBuildErrors: true,                                                                                                             
    },                                                                                                                                     
    images: {                                                                                                                              
      unoptimized: true,                                                                                                                   
    },                                                                                                                                     
  };                                                                                                                                       
                                                                                                                                           
  export default nextConfig; 