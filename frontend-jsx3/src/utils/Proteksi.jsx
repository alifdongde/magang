import { Navigate } from "react-router-dom";

const Proteksi = ({isLogin,children})=>{
    if(!isLogin){
        return <Navigate to="/menu"replace/>;
    }
    return children;
};

export default Proteksi;