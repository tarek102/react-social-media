import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
function Navbar() {
  const [user] = useAuthState(auth);
  const signUserOut = async () => {
    await signOut(auth);
  };
  return (
    <nav>
      <div className="menu-links">
        <Link to="/">Home</Link>
        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <Link to="/createpost">Create Post</Link>
        )}
      </div>

      {user && (
        <div className="user-info">
          <h3>{user?.displayName}</h3>
          <img src={user?.photoURL || ""} width="50" height="50"></img>
          <button onClick={signUserOut}>Sign out</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
