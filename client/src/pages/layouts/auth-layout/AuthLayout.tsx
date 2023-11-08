import { Button } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

export function AuthLayout(){

    const navige = useNavigate();

    return(  
        <div className="h-screen p-10">
            <div>
                <Button startIcon={<ArrowBackRoundedIcon/>} onClick={()=>navige(-1)}>Back</Button>
            </div>
            <div className="h-full w-full flex items-center justify-center">
                <Outlet/>
            </div>
        </div>
    )
}