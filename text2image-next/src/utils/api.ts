import axios from "axios";
import { Image } from "./types";

export const fetchImage = async () => {
    try {
        //await new Promise((resolve) => setTimeout(resolve, 5000));
        const response = await axios.post<Image>("http://localhost:8080");
        const images=response.data;
        
        return { props: { images } };
    
    } catch (error) {
        return { props: { images: {} } };
    }
};
