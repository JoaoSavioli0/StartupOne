import { CloudArrowUpIcon, PlusIcon, XIcon } from "@phosphor-icons/react";
import { Button } from "primereact/button";
import {
  FileUpload,
  FileUploadHandlerEvent,
  FileUploadUploadEvent,
} from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Toast } from "primereact/toast";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

export default function FileUploadComponent() {
  interface FilePreview {
    file: File;
    url: string;
  }

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<FilePreview[]>([]);
  const [fileListSize, setFileListSize] = useState(0);

  useEffect(() => {
    const fullSize = fileList.reduce((result, file) => {
      return result + file.file.size;
    }, 0);

    setFileListSize(fullSize / 1024 / 1024);
  }, [fileList]);

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles: FilePreview[] = Array.from(e.target.files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    const newFilesSize = Array.from(e.target.files).reduce((res, file) => {
      return res + file.size;
    }, 0);

    const totalSize = newFilesSize + fileListSize * 1024 * 1024;

    if (totalSize > 20 * 1024 * 1024) {
      alert("Tamanho total dos arquivos não pode passar de 20mb");
      return;
    }

    setFileList((prev: FilePreview[]) => [...prev, ...newFiles]);

    e.target.value = "";
  };

  const valueTemplate = (value: number) => {
    return <React.Fragment></React.Fragment>;
  };

  return (
    <div>
      <div className="w-full rounded-md border-dotted border-2 border-gray-300 flex flex-col justify-center items-center py-10 text-center px-1">
        <CloudArrowUpIcon size={30} />
        <p className="font-semibold">
          Escolha um arquivo ou arraste e solte aqui
        </p>
        <p className="text-sm text-gray-500">JPEG, PNG ou MP4 até 20mb</p>
        <div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            multiple
            onChange={onUpload}
            style={{ display: "none" }} // input escondido
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-button p-component !mt-4 !py-2 font-semibold flex gap-x-2"
          >
            <PlusIcon weight="bold" />
            Escolher
          </button>
        </div>
      </div>
      {fileList.length > 0 && (
        <div className="w-full mt-2 flex flex-col gap-y-2">
          <div className="card">
            <div className="w-full flex justify-end">
              {fileListSize.toFixed(2)}/20mb
            </div>
            <ProgressBar
              className="!h-[3px]"
              value={(fileListSize / 20) * 100}
              displayValueTemplate={valueTemplate}
            ></ProgressBar>
          </div>

          {fileList.map(({ file, url }, index) => (
            <div
              key={index}
              className="w-full rounded-lg p-3 max-h-[85px] flex justify-between items-center bg-gray-100"
            >
              <div className="flex max-w-[80%]">
                <img src={url} className="w-[60px] h-auto" />
                <div className="flex flex-col ml-1.5">
                  <span className="font-semibold text-sm">{file.name}</span>
                  <span className="text-gray-400 text-xs">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                </div>
              </div>
              <div className="w-[20%] flex justify-end">
                <Button
                  type="button"
                  icon={<XIcon size={18} />}
                  rounded
                  outlined
                  className="!size-[35px]"
                  severity="secondary"
                  onClick={() =>
                    setFileList((prev) => prev.filter((_, i) => i !== index))
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
