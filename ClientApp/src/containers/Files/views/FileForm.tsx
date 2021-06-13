import React, { useEffect, useState } from "react"
import { FormGroup, Input, Label, FormText, Col } from "reactstrap"
import { uploadFile } from "../../../services/fileService"
import useFileForm from "../hooks/useFileForm"

const FileForm = () => {
  const { file, setFile } = useFileForm()

  const handleChange = (e: any) => {
    let reader = new FileReader()
    const file = e.target.files[0]

    reader.onloadend = () => {
      setFile(file)
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  if (!!file) {
    const formData = new FormData()
    const { name } = file

    formData.append("file", file, name)
    uploadFile(formData)
  }

  return (
    <FormGroup row>
      <Label for="exampleFile" sm={2}>
        File
      </Label>
      <Col sm={10}>
        <Input
          type="file"
          name="file"
          id="exampleFile"
          onChange={handleChange}
        />
        <FormText color="muted">
          This is some placeholder block-level help text for the above input.
          It's a bit lighter and easily wraps to a new line.
        </FormText>
      </Col>
    </FormGroup>
  )
}

export default FileForm
