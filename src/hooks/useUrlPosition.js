import { useSearchParams } from "react-router-dom";

export function useUrlPosition(){
    const[searchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    console.log("url position is " , lat ,lng)
    return[
        lat ? parseFloat(lat) : null,
        lng ? parseFloat(lng) :null
    ];
}