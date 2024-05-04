import { useSearchParams } from "react-router-dom";
import { getParams } from "../utils/helper";

export const useSearchParamValues = () => {
    const [searchParams] = useSearchParams();
    return getParams(searchParams)
}