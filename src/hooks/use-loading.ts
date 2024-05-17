import { useCallback, useState } from "react";

export default function useLoading() {
    const [loading, setLoading] = useState<boolean>()

    const handleLoading = useCallback((bool: boolean) => {
        setLoading(bool)
    },[])
    return {loading, handleLoading}
}