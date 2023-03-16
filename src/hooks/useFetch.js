import axios from "axios"
import { useEffect, useState } from "react"


const useFetch = (endpoint, header = {}) => {
    
    const [data, setData] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)
    
    useEffect(()=> {
        axios(`${import.meta.env.VITE_API}/${endpoint}`, header)
        .then(resp => {
            setData(resp.data)
        })
        .catch(err => {
            setError(err)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])
    return {data, error, loading}
}


export default useFetch