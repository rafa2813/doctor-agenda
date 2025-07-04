import "better-auth";

declare module "better-auth" {
  interface User {
    clinic?: {
      id: string;
      name?: string;
    };
  }
}
