import React, { useState } from "react";
import { LoggerNavigation } from "./routes";
import { Auth } from "./pages";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { PlayerProvider } from "./context";

export default function App() {
  const [user, setUser] = useState(undefined);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  if (user === undefined) return null;

  return user ? (
    <PlayerProvider>
      <LoggerNavigation />
    </PlayerProvider>
  ) : (
    <Auth />
  );
}
