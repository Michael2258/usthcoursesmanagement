import React, { CSSProperties, FC } from "react"
import { Alert } from "reactstrap"

interface Props {
    label: string
    className?: string
    style?: CSSProperties
}

const EmptyDataAlert: FC<Props> = ({ label, className, style }: Props) => {
    return (
        <Alert color="primary" className={className} style={style}>
            No {label} to display
        </Alert>
    )
}

EmptyDataAlert.defaultProps = {
    className: "",
    style: {}
}

export default EmptyDataAlert
