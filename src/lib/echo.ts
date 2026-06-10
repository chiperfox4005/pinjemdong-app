import Echo from "laravel-echo";
import Pusher from "pusher-js";

if (typeof window !== "undefined") {
  // @ts-ignore
  window.Pusher = Pusher;
}

let echoInstance: Echo | null = null;

export const getEcho = () => {
  if (typeof window === "undefined") return null;

  if (!echoInstance) {
    echoInstance = new Echo({
      broadcaster: "reverb",
      key: "ebqjb5gcbwrmlk428asd",
      wsHost: "localhost",
      wsPort: 8080,
      wssPort: 8080,
      forceTLS: false,
      enabledTransports: ["ws", "wss"],
    });
  }

  return echoInstance;
};
