import { useState } from "react"

export const useLoad = () => {
    const [loading, setLoad] = useState<boolean>(false)
    const handleLoading = () => {
        setLoad(true)
    }
    return { loading, handleLoading }
}