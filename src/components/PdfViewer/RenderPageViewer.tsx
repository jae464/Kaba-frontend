import {
  ScrollMode,
  ViewMode,
  Viewer,
  Worker,
  type RenderPage,
  type RenderPageProps,
} from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import * as React from 'react';

const RenderPageViewer = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    toolbarPlugin: {
      fullScreenPlugin: {
        onEnterFullScreen: () => {
          defaultLayoutPluginInstance.toolbarPluginInstance.scrollModePluginInstance.switchScrollMode(
            ScrollMode.Vertical,
          );
        },
        onExitFullScreen: () => {
          defaultLayoutPluginInstance.toolbarPluginInstance.scrollModePluginInstance.switchScrollMode(
            ScrollMode.Page,
          );
        },
      },
    },
  });

  const renderPage: RenderPage = (props: RenderPageProps) => (
    <>
      {props.canvasLayer.children}
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          left: 0,
          position: 'absolute',
          top: 0,
          width: '100%',
          backgroundColor: '#fff',
        }}
      >
        <div
          style={{
            color: 'rgba(0, 0, 0, 0.2)',
            fontSize: `${8 * props.scale}rem`,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            userSelect: 'none',
          }}
        >
          {props.pageIndex + 1}
        </div>
      </div>
      {props.annotationLayer.children}
      {props.textLayer.children}
    </>
  );

  return (
    <>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <div
          style={{
            height: '50rem',
            width: '64rem',
            margin: '1rem auto',
          }}
        >
          <Viewer
            initialPage={20}
            defaultScale={0.7}
            scrollMode={ScrollMode.Page}
            viewMode={ViewMode.DualPageWithCover}
            fileUrl={'./little_prince.pdf'}
            plugins={[defaultLayoutPluginInstance]}
            renderPage={renderPage}
          />
        </div>
      </Worker>
    </>
  );
};

export default RenderPageViewer;
