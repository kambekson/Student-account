import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker?url";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";

import "@/Presentation/Styles/pdfViewer.scss";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

interface PDFViewerProps {
  fileUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [scale, setScale] = useState(1.0);

  const handleZoom = (factor: number) => {
    setScale((prev) => prev + prev * factor);
  };

  return (
    <div>
      <div className="pdf-controls">
        <button className="primary-button" onClick={() => handleZoom(1.1)}>
          <AiOutlineZoomIn size={20} />
        </button>
        <button className="primary-button" onClick={() => handleZoom(0.9)}>
          <AiOutlineZoomOut size={20} />
        </button>
      </div>

      <div className="pdf-viewer">
        <Document
          file={fileUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page key={index} pageNumber={index + 1} scale={scale} />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default PDFViewer;
