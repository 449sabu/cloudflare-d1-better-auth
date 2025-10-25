// import { createRequestHandler } from "react-router";
import { createRequestHandler, RouterContextProvider } from "react-router";

// declare module "react-router" {
//   export interface AppLoadContext {
//     cloudflare: {
//       env: Env;
//       ctx: ExecutionContext;
//     };
//   }
// }

declare module "react-router" {
  export interface RouterContextProvider {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

// export default {
//   async fetch(request, env, ctx) {
//     return requestHandler(request, {
//       cloudflare: { env, ctx },
//     });
//   },
// } satisfies ExportedHandler<Env>;

export default {
  async fetch(request, env, ctx) {
    // RouterContextProviderを使用
    const context = new RouterContextProvider();
    context.cloudflare = { env, ctx };
    
    return requestHandler(request, context);
  },
} satisfies ExportedHandler<Env>;
