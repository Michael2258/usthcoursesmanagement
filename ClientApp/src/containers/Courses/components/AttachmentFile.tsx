import React, { FC, Fragment } from "react";
import course from "../styles/course.module.scss";

interface Props {
  label: string;
  onRemove?: any;
  fileType: string;
  downloadFile?: any;
}

const AttachmentFile: FC<Props> = ({
  label,
  onRemove,
  fileType,
  downloadFile,
}: Props) => {
  return (
    <Fragment>
      <div className={`${course["attachment-file__wrapper"]}`}>
        <div className={`${course["attachment-file__info"]}`}>
          <div className={`${course["attachment-file__info-img"]}`}>
            <div style={{ margin: 0 }} className={`fi fi-${fileType}`}>
              <div className="fi-content">{fileType}</div>
            </div>
          </div>

          <div className={`${course["attachment-file__info-name"]}`}>
            {label}
          </div>
        </div>

        <div className={`${course["attachment-file__actions-container"]}`}>
          <div className={`${course["attachment-file__action-remove"]}`}>
            <i
              className="fa fa-times text-danger cursor-pointer hover-opacity"
              onClick={onRemove}
            />
          </div>

          <div className={`${course["attachment-file__action-download"]}`}>
            <i
              onClick={downloadFile}
              className="fa fa-arrow-circle-down text-success cursor-pointer hover-opacity"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AttachmentFile;
