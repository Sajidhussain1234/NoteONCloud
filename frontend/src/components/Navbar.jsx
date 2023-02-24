import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation;  
    const navigate = useNavigate(); 

    const handleLogout = ()=>{
      localStorage.removeItem('token');
      navigate("/login"); 
      
    }



  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top justify-content-between">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          NoteONCloud
        </Link>      
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/"?"active":""} `} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/about"?"active":""} `} to="/about">
                About
              </Link>         
             

            </li>
          </ul>
        </div>
        {!localStorage.getItem('token')?<form className="d-flex"> 
                    <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                    <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                    </form>
        :<button className= "btn btn-primary" onClick={handleLogout}>Logout</button>
      }
      </div>
    </nav>
  );
};

export default Navbar;
