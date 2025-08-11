import { useSearchParams } from "react-router-dom";

const [searchParams , setSearchParams] = useSearchParams();

const lat = searchParams.get("lat");
const lng = searchParams.get("lng");

return (
    <div className={styles.mapContainer} onClick={()=>navigate("form")}>

    </div>
)
export default Map;