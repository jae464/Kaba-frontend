import styled from 'styled-components';

import { FaArrowLeft, FaBars, FaMinus, FaPlus, FaTimes } from 'react-icons/fa';

import NetworkGraph from '../../components/NetworkGraph/NetworkGraph';
import ReactModal from 'react-modal';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { getBookAPI, getNetworkGraphDataAPI } from '../../api/openai';
import PictureDiary from '../../components/PictureDiary/PictureDiary';
import { useNavigate, useParams } from 'react-router-dom';
import StorySummary from '../../components/StorySummary/StorySummary';
import KabaWiki from '../../components/KabaWiki/KabaWiki';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import PDFViewerOriginal from '../../components/PdfViewer/PdfViewerOriginal';
import { CharacterRelationShip } from '../../type/api/relation';
import { useMediaQuery } from 'react-responsive';

const Book = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [networkData, setNetworkData] = useState<CharacterRelationShip | null>(
    null,
  );
  const [filePath, setFilePath] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [initialX, setInitialX] = useState(0);
  const [width, setWidth] = useState(800);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState<number>(1);
  const [networkGraphPage, setNetworkGraphPage] = useState(0);
  const [summaryPage, setSummaryPage] = useState(0);
  const [wikiKeyword, setWikiKeyword] = useState<string>('');
  const [diaryKeyword, setDiaryKeyword] = useState<string>('');
  const [openWiki, setOpenWiki] = useState<boolean>(false);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  const { bookId } = useParams();
  const navigate = useNavigate();

  const fetchBook = async () => {
    if (bookId != null) {
      const data = await getBookAPI(bookId);
      setFilePath(data.file_path);
    }
  };
  useEffect(() => {
    fetchBook();
  }, []);

  const fetchPeopleData = async () => {
    if (bookId != null) {
      setNetworkData(null);
      const datas = await getNetworkGraphDataAPI(bookId, 0, pageNumber);
      console.log('fetchPeopleData : ' + datas);
      setNetworkData(datas);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('mouse down');
    setIsResizing(true);
    setInitialX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      const newWidth = width + e.clientX - initialX;
      setInitialX(e.clientX);
      if (newWidth >= 600 && newWidth <= 2000) {
        console.log(newWidth);
        setWidth(newWidth);
      }
    }
  };

  const handlePictureDiaryClicked = (sentence: string) => {
    console.log('sentence : ' + sentence);
    setIsOpened(true);
    setSelectedTab('그림일기');
    // setSelectedText(sentence);
    setDiaryKeyword(sentence);
  };

  const handleKabaWikiClicked = (search: string) => {
    setOpenWiki(true);
    // setSelectedText(search);
    setWikiKeyword(search);
  };

  const renderGenAIContainer = (tab: string) => {
    switch (tab) {
      case '인물관계도':
        return <NetworkGraph page={networkGraphPage} data={networkData} />;
      case '그림일기':
        return bookId ? (
          <PictureDiary bookId={bookId} sentence={diaryKeyword} />
        ) : null;
      case '지난줄거리':
        return bookId ? (
          <StorySummary bookId={bookId} page={summaryPage} />
        ) : null;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  // 모달이 열릴 때와 닫힐 때 배경 스크롤 제어
  useEffect(() => {
    if (isOpened && isTabletOrMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpened, isTabletOrMobile]);

  return (
    <>
      <Layout>
        <Container>
          <LeftArea width={width} isOpened={isOpened}>
            <PDFContainer>
              <TopBar>
                <StyledFaChevronLeft size={48} onClick={() => navigate('/')} />
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
                <Menu>
                  <MenuIcon onClick={toggleDropdown}>
                    <StyledFaBars size={48} />
                  </MenuIcon>
                  {isDropdownOpen && (
                    <DropdownMenu>
                      <DropdownItem
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setIsOpened(true);
                          setNetworkGraphPage(pageNumber);
                          setSelectedTab('인물관계도');
                          fetchPeopleData();
                        }}
                      >
                        인물관계도
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setIsOpened(true);
                          setSummaryPage(pageNumber);
                          setSelectedTab('지난줄거리');
                        }}
                      >
                        지난줄거리
                      </DropdownItem>
                    </DropdownMenu>
                  )}
                </Menu>
              </TopBar>
              {!filePath && <LoadingSpinner />}
              {filePath && !(isOpened && isTabletOrMobile) && (
                <PDFViewerOriginal
                  path={filePath}
                  pageNumber={pageNumber}
                  scale={scale}
                  setPageNumber={setPageNumber}
                  onClickPictureDiary={handlePictureDiaryClicked}
                  onClickKabaWiki={handleKabaWikiClicked}
                />
              )}
              {bookId && wikiKeyword && openWiki && (
                <KabaWikiWrapper
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <KabaWiki
                    bookId={bookId}
                    search={wikiKeyword}
                    onClickClose={() => {
                      console.log('onClickClose');
                      setOpenWiki(false);
                    }}
                  />
                </KabaWikiWrapper>
              )}
            </PDFContainer>
          </LeftArea>

          {isOpened && !isTabletOrMobile && selectedTab && (
            <>
              <SplitDivider onMouseDown={handleMouseDown} />
              <GenAIContainer
                width={`calc(100% - ${width}px)`}
                isOpened={isOpened}
              >
                {renderGenAIContainer(selectedTab)}
              </GenAIContainer>
            </>
          )}

          {isOpened && isTabletOrMobile && selectedTab && (
            <>
              <CustomReactModal
                isOpen={isOpened}
                shouldCloseOnOverlayClick={false}
              >
                <CloseButton onClick={() => setIsOpened(false)}>
                  <FaTimes size={32} />
                </CloseButton>
                {renderGenAIContainer(selectedTab)}
              </CustomReactModal>
            </>
          )}
        </Container>
      </Layout>
    </>
  );
};

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem;
  /* background-color: black; */
  justify-content: space-between;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fef7da;
`;

const LeftArea = styled.div<{ width: number; isOpened: boolean }>`
  display: flex;
  flex-direction: row;
  width: ${({ width, isOpened }) => (!isOpened ? '100%' : `${width}px`)};
`;

const PDFContainer = styled.div`
  /* position: relative; */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const GenAIContainer = styled.div<{ width: string; isOpened: boolean }>`
  display: flex;
  width: ${({ width }) => width};
  align-items: center;
  justify-content: center;
  background-color: #fef7da;
  overflow: auto;
`;

const Menu = styled.div`
  /* position: relative; */
  right: 10px;
  display: flex;

  flex-direction: column;
  align-items: end;
`;

const MenuIcon = styled.div`
  cursor: pointer;
`;

const StyledFaChevronLeft = styled(FaArrowLeft)`
  color: #ffd953;

  padding: 0.5rem;
  border-radius: 2rem;
  cursor: pointer;
  &:hover {
    background-color: #282c34;
  }
`;

const StyledFaBars = styled(FaBars)`
  background-color: #fad346;
  padding: 1rem;
  border-radius: 2rem;
  color: white;
  &:hover {
    background-color: #282c34;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  margin-top: 3rem;
  width: 8rem;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const SplitDivider = styled.div`
  width: 0.5rem;
  height: 100%;
  background-color: #ffe898;
  cursor: col-resize;
  &:hover {
    background-color: #3b82f6;
  }
`;

const KabaWikiWrapper = styled.div`
  position: absolute;
  align-items: center;
  top: 30%;
  left: 45%;
  z-index: 4000;
`;
const ZoomContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
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

const CustomReactModal = styled(ReactModal)`
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: white;
`;

const CloseButton = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
`;
export default Book;
