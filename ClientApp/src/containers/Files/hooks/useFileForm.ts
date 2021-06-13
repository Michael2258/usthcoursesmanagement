import React, { useState } from "react"

const useFileForm = () => {
  const [file, setFile] = useState<any>(null)

  return { file, setFile }
}

export default useFileForm
