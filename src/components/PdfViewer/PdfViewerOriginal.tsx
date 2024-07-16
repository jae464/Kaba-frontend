import { useEffect, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import ebang from './1377342678.pdf';
import styled from 'styled-components';
import { FaBook, FaSearch, FaShareSquare, FaSpinner } from 'react-icons/fa';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const options = {
  cMapUrl: '/cmaps/',
};

type PDFViewerProps = {
  path: string;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  onClickPictureDiary: (sentence: string) => void;
  onClickKabaWiki: (search: string) => void;
};

interface Coords {
  top: number;
  left: number;
}

const PDFViewerOriginal = ({
  path,
  pageNumber,
  setPageNumber,
  onClickPictureDiary,
  onClickKabaWiki,
}: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [selectedText, setSelectedText] = useState<string>('');
  const [selectionCoords, setSelectionCoords] = useState<Coords | null>(null);
  const [scale, setScale] = useState<number>(1);
  const pdfRef = useRef<HTMLDivElement>(null);
  const [pdfLoading, setPdfLoading] = useState<boolean>(true);
  const [openInfo, setOpenInfo] = useState<boolean>(false);

  useEffect(() => {
    console.log('file path : ' + path);
    console.log('import file path : ' + ebang);
  }, []);

  const handleMouseUp = (e: any) => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      console.log(selection.toString());
      setSelectedText(selection.toString());
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      const wrapperRect = pdfRef.current?.getBoundingClientRect();
      // const documentRect = document.documentElement.getBoundingClientRect();

      console.log(`rect : top ${rect.top} left ${rect.left}`);

      if (wrapperRect) {
        // 좌표를 PDF 컨테이너 내부 좌표로 변환
        console.log(
          `wrapperRect : top ${wrapperRect.top} wrapperRect ${wrapperRect.left}`,
        );
        // todo 아래로 scroll한 위치만큼 더해줘야함.
        const coords: Coords = {
          top: rect.y - wrapperRect.top + (pdfRef.current?.scrollTop || 0) - 40,
          left:
            rect.x - wrapperRect.left + (pdfRef.current?.scrollLeft || 0) - 20,
        };
        console.log(`coords top : ${coords.top}, left : ${coords.left}`);
        setSelectionCoords(coords);
      }
      setOpenInfo(true);
    }
  };

  const handleMouseDown = () => {
    setTimeout(() => {
      if (window.getSelection()?.toString().length === 0) {
        // setSelectionCoords(null);
        setOpenInfo(false);
      }
    }, 500);
  };

  const onDocumentLoadSuccess = ({ numPages }: pdfjs.PDFDocumentProxy) => {
    console.log('load success');
    setNumPages(numPages);
    setPageNumber(1);
    setPdfLoading(false);
  };

  const onDocumentError = (error: Error) => {
    console.log(`onDocumentError : ${error.message}`);
    setPdfLoading(false); // 에러 발생 시에도 로딩 상태 false로 설정
  };

  const onDocumentLocked = () => {
    console.log('onDocumentLocked');
  };

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <>
      <Container>
        {pdfLoading && (
          // <LoadingContainer>
          //   <FaSpinner className="fa-spin" size={50} />
          // </LoadingContainer>
          <div style={{ width: '100%', height: '100%' }}></div>
        )}
        <PDFWrapper
          ref={pdfRef}
          onMouseUp={handleMouseUp}
          onMouseDown={handleMouseDown}
        >
          <Document
            options={options}
            file={path}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentError}
            onPassword={onDocumentLocked}
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              loading={<div style={{ width: '100%', height: '100%' }}></div>}
            />
          </Document>

          {selectedText && selectionCoords && openInfo && (
            <InfoWindowContainer
              style={{
                top: `${selectionCoords.top}px`,
                left: `${selectionCoords.left}px`,
                // backgroundColor: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '4rem',
                zIndex: 1000,
                boxShadow:
                  '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)', // 입체감을 위한 그림자 추가
                transform: 'translateY(-4px)', // 살짝 떠 있는 효과
                transition: 'transform 0.3s ease-in-out', // 부드러운 애니메이션

                cursor: 'pointer',
              }}
            >
              <IconContainer>
                <FaSearch size={24} color="white" />
                <StyledFaBook
                  size={24}
                  color="white"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(selectedText);
                    onClickKabaWiki(selectedText);
                  }}
                />
                <StyledFaShareSquare
                  size={24}
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(selectedText);
                    onClickPictureDiary(selectedText);
                  }}
                />
              </IconContainer>
            </InfoWindowContainer>
          )}
        </PDFWrapper>

        <div
          style={{
            marginTop: '2rem',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <p>
            {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
          </p>
          <div>
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
            >
              Previous
            </button>
            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
            >
              Next
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                setScale((prev) => prev - 0.2);
              }}
            >
              -
            </button>
            <button
              onClick={() => {
                setScale((prev) => prev + 0.2);
              }}
            >
              +
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PDFWrapper = styled.div`
  position: relative;
  height: 75vh;
  min-width: 30%;
  max-width: 80%;
  border-radius: 15px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  // border-radius: 4rem;
  overflow-y: scroll;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  justify-content: start;

  margin: auto;
  background-color: white;
  /* ::selection {
    background-color: #ffdec0;
    color: black;
  } */
`;

const InfoWindowContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #ffdec0;
  position: absolute;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5;
  gap: 1.3rem;
  justify-content: space-between;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh; // PDFWrapper와 같은 높이로 설정
`;

const StyledFaShareSquare = styled(FaShareSquare)`
  color: white;
  border-radius: 2rem;
  /* padding: 0.5rem; */
  &:hover {
    background-color: black;
    cursor: pointer;
  }
`;

const StyledFaBook = styled(FaBook)`
  color: white;
  border-radius: 2rem;
  /* padding: 0.5rem; */
  &:hover {
    background-color: black;
    cursor: pointer;
  }
`;
export default PDFViewerOriginal;
