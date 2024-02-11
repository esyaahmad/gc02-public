import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/`)
    }

  return (
    <>
      <div className="navbar bg-base-100 p-0 m-0">
        <div className="navbar">
          <a className="btn btn-ghost text-xl bg-red-600 font-sans text-yellow-400" onClick={handleClick}>Mekidi</a>
        </div>
      </div>
      <Outlet/>
    </>
  );
}
