import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
 
export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    GITHUB_ID: z.string(),
    GITHUB_SECRET: z.string(),
  },
  client: {
    // Nothing here yet
  },
  // Maybe you can use just `runtimeEnv` if there is a MAJ. 
  // Please follow the docs : https://env.t3.gg/docs/nextjs#create-your-schema
  experimental__runtimeEnv: {
    // Nothing here yet, we just need to put client env here
  },
});
