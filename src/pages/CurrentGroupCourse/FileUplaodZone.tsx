import { FC, DragEvent, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

export interface TUploadFile {
  file: File;
  displayName: string;
}

export const FileUploadZone: FC<{
  files: TUploadFile[];
  setFiles: (newFiles: TUploadFile[]) => void;
}> = ({ files, setFiles }) => {
  const { t } = useTranslation();
  const handleFileDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length > 0) {
      const uploadedFiles = Array.from(e.dataTransfer.files).map((f) => ({
        file: f,
        displayName: f.name.replace(/\.[^/.]+$/, ""),
      }));
      setFiles([...files, ...uploadedFiles]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedFiles = Array.from(e.target.files).map((f) => ({
        file: f,
        displayName: f.name.replace(/\.[^/.]+$/, ""),
      }));
      setFiles([...files, ...uploadedFiles]);
    }
  };

  return (
    <div
      className="file-dropzone"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleFileDrop}
    >
      <p className="file-dropzone-text">
        {t("Перетащите файлы сюда или нажмите, чтобы выбрать")}
      </p>
      <input
        type="file"
        style={{ display: "none" }}
        multiple
        onChange={handleFileChange}
        id="fileInput"
      />
      <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
        {t("Выбрать файл(ы)")}
      </label>

      {files.length > 0 && (
        <div style={{ marginTop: "15px" }}>
          <strong>{t("Загруженные файлы")}:</strong>
          <ul
            style={{
              textAlign: "left",
              marginTop: "5px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {files.map((f, idx) => (
              <li key={idx}>{f.file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
