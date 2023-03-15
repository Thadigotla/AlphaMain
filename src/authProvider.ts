import { AuthProvider } from "@pankod/refine-core";
import nookies from "nookies";
import { nhost } from "./utility";

// const mockUsers = [
//   {
//     username: "gayasuddin.s@ampcome.com",
//     email: "gayasuddin.s@ampcome.com",
//     roles: ["admin"],
//   },
//   {
//     username: "editor",
//     email: "editor@refine.dev",
//     roles: ["editor"],
//   },
// ];

export const authProvider: AuthProvider = {
  login: async ({ email, username, password, remember }) => {
    // Suppose we actually send a request to the back end here.    
    const user = await nhost.auth.signIn({
      email: email,
      password,
    });

    console.log(user);
    

    if (user) {
      nookies.set(null, "auth", JSON.stringify(user), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      return Promise.resolve();
    }

    return Promise.reject();
  },
  logout: () => {
    nookies.destroy(null, "auth");
    return Promise.resolve();
  },

  checkError: (error) => {
    if (error && error.statusCode === 401) {
      return Promise.reject();
    }

    return Promise.resolve();
  },
  checkAuth: (ctx) => {
    const cookies = nookies.get(ctx);
    return cookies["auth"] ? Promise.resolve() : Promise.reject();
    //  const isAuthenticated = await nhost.auth.isAuthenticatedAsync();
    //     if (isAuthenticated) {
    //         return {
    //             authenticated: true,
    //         };
    //     }

    //     return {
    //         authenticated: false,
    //         error: new Error("Not authenticated"),
    //         logout: true,
    //         redirectTo: "/login",
    //     };
  },
  getPermissions: () => {
    const auth = nookies.get()["auth"];
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return Promise.resolve(parsedUser.roles);
    }
    return Promise.reject();
  },
  getUserIdentity: () => {
    const auth = nookies.get()["auth"];
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return Promise.resolve(parsedUser.username);
    }
    return Promise.reject();
  },
};
