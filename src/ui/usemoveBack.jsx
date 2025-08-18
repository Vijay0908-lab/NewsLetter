import { useNavigate } from "react-router-dom";

export  function  usemoveBack() {
     const navigate = useNavigate();
     return ()=> navigate(-1);
}

