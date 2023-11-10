import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useAPI = (key: string, endpoint: string, options = {}, parameter = null) => {
    const fetchData = async () => {
        const options = {
            method: 'GET',
            url: `http://localhost:3000/${endpoint}`,
            headers: { Authorization: 'Basic YWRtaW46KlZhbGVudGlub18yMDE5Kg==' },
        };
        const response = await axios(options)
        return response.data
	};

    const mergedOptions = {
        ...options,
    }

    return useQuery({
        queryKey: [key, parameter],
        queryFn: fetchData,
        ...mergedOptions,
    })
}