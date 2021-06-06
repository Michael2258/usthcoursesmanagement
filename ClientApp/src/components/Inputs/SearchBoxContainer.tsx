import React, { FC, CSSProperties } from "react"

import AddButton from "../Buttons/AddButton"
import SearchBox from "./SearchBox"

interface Props {
  text: string
  onClick: () => void
  initValue: string
  onSearch: (searchString?: string) => void
  placeholder?: string
}

const searchInputStyle: CSSProperties = {
  height: 38,
}

const SearchBoxContainer: FC<Props> = ({
  text,
  initValue,
  onClick,
  onSearch,
  placeholder,
}: Props) => {
  return (
    <div className="d-flex align-items-center">
      <div>
        <AddButton text={text} onClick={onClick} />
      </div>
      <div className="flex-grow-1 ml-2">
        <SearchBox
          initValue={initValue}
          onSearch={onSearch}
          placeholder={placeholder}
          style={searchInputStyle}
        />
      </div>
    </div>
  )
}

SearchBoxContainer.defaultProps = {
  placeholder: "Type something to search",
}

export default SearchBoxContainer
