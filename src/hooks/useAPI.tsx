import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useAPI = (key: string, endpoint: string, options = {}, parameter = null) => {
    const fetchData = () => {
		return axios.get(`http://localhost:4000/${endpoint}`)
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