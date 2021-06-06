import React, { FC, useEffect, useState } from "react"
import Select from "react-select"
import {
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap"

import { DEFAULT_LIMIT_OPTIONS } from "../../utils/constants"

interface Props {
  page: number
  limit: number
  totalItems: number
  changePage: (page: number) => void
  changeLimit: (limit: number) => void
}

const CustomPagination: FC<Props> = ({
  page,
  limit,
  totalItems,
  changePage,
  changeLimit,
}: Props) => {
  const [input, setInput] = useState<string>("")

  useEffect(() => {
    setInput(page.toString())
  }, [page])

  return (
    <Row>
      <Col md={12} className="d-flex justify-content-end">
        <Pagination>
          <div className="mr-1 pagination-dropdown">
            <Select
              className="text-center"
              value={
                !!limit
                  ? {
                      label: limit,
                      value: limit,
                    }
                  : DEFAULT_LIMIT_OPTIONS[0]
              }
              options={DEFAULT_LIMIT_OPTIONS}
              onChange={(e: any) => changeLimit(e.value)}
            />
          </div>

          <PaginationItem className="mr-1">
            <PaginationLink
              previous
              tag="button"
              className="h-100"
              disabled={page <= 1}
              onClick={() => changePage(page - 1)}
            >
              Prev
            </PaginationLink>
          </PaginationItem>

          <input
            type="text"
            id="page-number-input"
            className="text-center pagination-input"
            onChange={(e: any) => setInput(e.target.value)}
            onKeyUp={(e: any) => {
              if (e.key === "Enter" || e.keyCode === 13) {
                changePage(parseInt(input))
              }
            }}
            value={input}
          />

          <PaginationItem className="ml-1">
            <PaginationLink
              next
              tag="button"
              className="h-100"
              disabled={page > totalItems / limit}
              onClick={() => changePage(page + 1)}
            >
              Next
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </Col>
    </Row>
  )
}

export default CustomPagination
