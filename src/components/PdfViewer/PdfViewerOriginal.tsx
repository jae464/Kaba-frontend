import { useEffect, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

import styled from 'styled-components';
import {
  FaBook,
  FaChevronLeft,
  FaChevronRight,
  FaMinus,
  FaPlus,
  FaSearch,
  FaShareSquare,
  FaSpinner,
} from 'react-icons/fa';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

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

  const handleTextSelection = () => {
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

  const handleMouseUp = () => {
    handleTextSelection();
  };

  const handleTouchEnd = () => {
    handleTextSelection();
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
    setPageNumber(1);
    setNumPages(numPages);
    setPdfLoading(false);
  };

  const onDocumentError = (error: Error) => {
    console.log(`onDocumentError : ${error.message}`);
    setPdfLoading(false); // 에러 발생 시에도 로딩 상태 false로 설정
  };

  const onDocumentLocked = () => {
    console.log('onDocumentLocked');
  };

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    if (pageNumber > 1) {
      changePage(-1);
    }
  };

  const nextPage = () => {
    console.log(`pageNumber ${pageNumber} numPages ${numPages}`);
    if (pageNumber < numPages) {
      changePage(1);
    }
  };

  useEffect(() => {
    console.log('file path : ' + path);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        previousPage();
      } else if (e.key === 'ArrowRight') {
        nextPage();
      }
    };

    if (numPages > 0) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [numPages, pageNumber]);

  return (
    <>
      <Container>
        <TopContainer>
          <PageContainer>
            {pageNumber || (numPages ? 1 : '--')} / {numPages || '--'}
          </PageContainer>
          <ZoomContainer>
            <StyledFaMinus
              size={48}
              onClick={() => {
                setScale((prev) => prev - 0.1);
              }}
            />

            <StyledFaPlus
              size={48}
              onClick={() => {
                setScale((prev) => prev + 0.1);
              }}
            />
          </ZoomContainer>
        </TopContainer>
        <SubContainer>
          {pageNumber > 1 && (
            <StyledFaChevronLeft size={48} onClick={previousPage} />
          )}
          {/* <button>1</button> */}
          <PDFWrapper
            ref={pdfRef}
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
            onTouchEnd={handleTouchEnd}
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
                  <TooltipWrapper>
                    <StyledFaBook
                      size={24}
                      color="white"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(selectedText);
                        onClickKabaWiki(selectedText);
                      }}
                    />
                    <TooltipText>KABA 위키</TooltipText>
                  </TooltipWrapper>
                  <TooltipWrapper>
                    <StyledFaShareSquare
                      size={24}
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(selectedText);
                        onClickPictureDiary(selectedText);
                      }}
                    />
                    <TooltipText>그림일기</TooltipText>
                  </TooltipWrapper>
                </IconContainer>
              </InfoWindowContainer>
            )}
          </PDFWrapper>
          {pageNumber < numPages && (
            <StyledFaChevronRight size={48} onClick={nextPage} />
          )}
        </SubContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 6rem;
  align-items: center;
  margin-bottom: 1rem;
`;

const PageContainer = styled.div`
  display: flex;
  font-size: 1.2rem;
  color: #fad346;
`;

const ZoomContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  width: 100%;
  height: 100%;
  gap: 1rem;
  /* background-color: green; */
`;

const PDFWrapper = styled.div`
  position: relative;
  max-height: 75vh;
  max-width: 80%;
  border-radius: 15px;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  background-color: lightgray;
  /* ::selection {
    background-color: #ffdec0;
    color: black;
  } */
`;

const StyledFaChevronLeft = styled(FaChevronLeft)`
  color: #ffd953;
  margin: 1rem;
  padding: 0.5rem;
  border-radius: 2rem;
  cursor: pointer;
  &:hover {
    background-color: #282c34;
  }
`;

const StyledFaChevronRight = styled(FaChevronRight)`
  color: #ffd953;
  margin: 1rem;
  padding: 0.5rem;
  border-radius: 2rem;
  cursor: pointer;
  &:hover {
    background-color: #282c34;
  }
`;
const StyledFaMinus = styled(FaMinus)`
  /* background-color: #fad346; */
  border: 2px solid #fad346;
  padding: 0.5rem;
  border-radius: 2rem;
  color: #fad346;
  cursor: pointer;
`;
const StyledFaPlus = styled(FaPlus)`
  /* background-color: #fad346; */
  border: 2px solid #fad346;
  padding: 0.5rem;
  border-radius: 2rem;
  color: #fad346;
  cursor: pointer;
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

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;

  &:hover span {
    visibility: visible;
    opacity: 1;
  }
`;

const TooltipText = styled.span`
  visibility: hidden;
  width: 80px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%; /* Place the tooltip above the text */
  left: 50%;
  margin-left: -30px; /* Center the tooltip */
  opacity: 0;
  transition: opacity 0.3s;

  /* Arrow */
  &::after {
    content: '';
    position: absolute;
    top: 100%; /* At the bottom of the tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
`;
export default PDFViewerOriginal;
