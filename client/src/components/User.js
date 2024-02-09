import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export default function User() {
  const { isAuthenticated, user } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div>
      <h1>Welcome {user.username}!</h1>
      <p>Feel free to explore the following options above.</p>
    </div>
  );
}
