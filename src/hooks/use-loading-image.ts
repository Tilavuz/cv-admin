import { useState } from "react";

export default function useLoadingImage() {
  const [load, setLoad] = useState<boolean>(false)

  function handleLoad(isLoad: boolean) {
    setLoad(isLoad)
  }

  return { handleLoad, load }

}