import { Link, NavLink } from "react-router-dom";
// import logo from "https://i.pinimg.com/564x/2e/fd/fb/2efdfba3cfa69ba059d714e7ce36958c.jpg";

export default function Header() {
  const getClass = ({ isActive }) => (isActive ? "nav-active" : null);

  return (
    <header className="container">
      <Link to="/">
        <img
          className="logo"
          src="https://i.pinimg.com/564x/2e/fd/fb/2efdfba3cfa69ba059d714e7ce36958c.jpg"
          alt="Red30 Tech logo"
          title="Red30 Tech | Home"
        />
      </Link>
      <nav>
        <NavLink to="/" className={getClass}>
          Home
        </NavLink>
        <NavLink to="/about" className={getClass}>
          About
        </NavLink>
        <NavLink to="/categories" className={getClass}>
          Categories
        </NavLink>
        <NavLink to="/register" className={getClass}>
          Register
        </NavLink>
      </nav>
    </header>
  );
}
