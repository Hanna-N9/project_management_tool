import { useAuth } from "./AuthContext";

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="main-conten">
      <h1>Welcome to ProjectHub</h1>
      {isAuthenticated ? (
        <p>
          Please click on the navigation bar to create and save your projects!
        </p>
      ) : (
        <p>Please log in to create and save your projects.</p>
      )}
    </div>
  );
}
