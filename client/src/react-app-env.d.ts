declare namespace NodeJS {
  interface ProcessEnv {
    //types of envs
    NODE_ENV: "development" | "production" | "test";
    PUBLIC_URL: string;
    REACT_APP_API_URL: string;
  }
}
