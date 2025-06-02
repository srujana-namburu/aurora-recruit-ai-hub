import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploaderProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDrag: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  dragActive: boolean;
  accept?: string;
  multiple?: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFileChange,
  onDrag,
  onDrop,
  dragActive,
  accept = '.pdf,.doc,.docx',
  multiple = true
}) => {
  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${dragActive ? 'border-rich-burgundy bg-rich-burgundy/5' : 'border-soft-lavender'}`}
      onDragEnter={onDrag}
      onDragOver={onDrag}
      onDragLeave={onDrag}
      onDrop={onDrop}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="p-4 bg-soft-lavender/20 rounded-full">
          <Upload className="h-8 w-8 text-rich-burgundy" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-charcoal-slate">Drag & drop resume files here</h3>
          <p className="text-sm text-charcoal-slate/70">or click to browse files</p>
          <p className="text-xs text-charcoal-slate/60">Supports PDF and Word documents</p>
        </div>
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={onFileChange}
          accept={accept}
          multiple={multiple}
        />
      </div>
    </div>
  );
};
