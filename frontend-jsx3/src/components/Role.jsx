import {useState} from "react";
import Login from "./Login";

const Role = () => {
    const [userRole,setUserRole] = useState(null)

    const handleLogin = (role) => {
        setUserRole(role)
    }
    return(
        <div>
            {userRole=== null ? (
                <Login onLogin= {handleLogin}/>
            ): userRole === 'admin'?( 
                  <div>
                <h2>Welcome, Admin!</h2>
                {/* Admin content goes here */}
              </div>
            ): (
                <div>
                <h2>Welcome, User!</h2>
                {/* User content goes here */}
              </div>
            )}
        </div>
    )
}


export default Role