import { useState } from "react"
import axios, { AxiosError, AxiosResponse } from "axios"

type ApiFunction<T> = () => Promise<AxiosResponse<T>>

export function useApi() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [data, setData] = useState<any>(null)

    const fetchData = async <T,>(apiFunc: ApiFunction<T>) => {
        setLoading(true)
        setError(null)
        try {
            const response = await apiFunc()
            setData(response.data)
            return response.data
        } catch (err) {
            const error = err as AxiosError
            setError(error.message || "An error occurred")
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { fetchData, loading, error, data }
}