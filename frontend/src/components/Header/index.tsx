import { Link } from "react-router-dom";

export function Header() {
  return (
    <div>
        <div>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      <h1>Valg System</h1>
    </div>
  );
}
