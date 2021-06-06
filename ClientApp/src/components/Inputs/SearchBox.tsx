import React, {
    FC,
    memo,
    useState,
    useEffect,
    useCallback,
    CSSProperties
} from "react"
import { Input } from "reactstrap"

interface Props {
    initValue: string
    onSearch: (searchString?: string) => any
    placeholder?: string
    className?: string
    style?: CSSProperties
}

const SearchBox: FC<Props> = ({
    initValue,
    onSearch,
    placeholder,
    className,
    style
}: Props) => {
    const [searchString, setSearchString] = useState(initValue)
    useEffect(() => {
        setSearchString(initValue)
    }, [initValue])

    const onKeyUp = useCallback(
        (e: any) => {
            e.key === "Enter" && onSearch(searchString)
        },
        [searchString, onSearch]
    )

    return (
        <Input
            placeholder={placeholder}
            value={searchString}
            onChange={e => setSearchString(e.target.value)}
            onKeyUp={onKeyUp}
            className={className}
            style={style}
        />
    )
}

SearchBox.defaultProps = {
    placeholder: "Type something to search",
    className: "",
    style: {}
}

export default memo(SearchBox)
