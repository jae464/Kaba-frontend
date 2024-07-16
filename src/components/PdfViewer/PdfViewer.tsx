import {
  MinimalButton,
  ScrollMode,
  SpecialZoomLevel,
  ViewMode,
  Worker,
} from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import {
  NextIcon,
  pageNavigationPlugin,
  PreviousIcon,
} from '@react-pdf-viewer/page-navigation';
import { useState } from 'react';

const PdfViewer = () => {
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { jumpToNextPage, jumpToPreviousPage } = pageNavigationPluginInstance;
  const [numPages, setNumPages] = useState<number>(8);

  return (
    <>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <div style={{ width: '400px' }}>
          <MinimalButton onClick={jumpToPreviousPage}>
            <PreviousIcon />
          </MinimalButton>
          <MinimalButton onClick={jumpToNextPage}>
            <NextIcon />
          </MinimalButton>
          <Viewer
            defaultScale={SpecialZoomLevel.PageFit}
            viewMode={ViewMode.DualPageWithCover}
            fileUrl={'./little_prince.pdf'}
            initialPage={1}
            scrollMode={ScrollMode.Page}
            onPageChange={(e) => {
              console.log(e.currentPage);
            }}
            plugins={[pageNavigationPluginInstance]}
          />
        </div>
      </Worker>
    </>
  );
};

export default PdfViewer;
