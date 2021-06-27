import React from "react"
import { Form, FormGroup, Label, Input } from "reactstrap"

const ImportCSV = () => {
  return (
    <Form>
      <FormGroup>
        <Label>Import Grade CSV</Label>

        <Input type="file" />
      </FormGroup>
    </Form>
  )
}

export default ImportCSV
