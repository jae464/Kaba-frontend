import styled from 'styled-components';

import { FaBars, FaChevronLeft } from 'react-icons/fa';
import PDFViewerOriginal from '../../components/PdfViewer/PdfViewerOriginal';

import NetworkGraph from '../../components/NetworkGraph/NetworkGraph';

import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { getBookAPI, getNetworkGraphDataAPI } from '../../api/openai';
import { PersonData } from '../../type/api/network';
import PictureDiary from '../../components/PictureDiary/PictureDiary';
import { useNavigate, useParams } from 'react-router-dom';
import StorySummary from '../../components/StorySummary/StorySummary';
import KabaWiki from '../../components/KabaWiki/KabaWiki';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const Book = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [networkData, setNetworkData] = useState<PersonData | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [initialX, setInitialX] = useState(0);
  const [width, setWidth] = useState(800);
  const [pageNumber, setPageNumber] = useState(1);
  const [wikiKeyword, setWikiKeyword] = useState<string>('');
  const [diaryKeyword, setDiaryKeyword] = useState<string>('');
  const [openWiki, setOpenWiki] = useState<boolean>(false);

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
      const datas = await getNetworkGraphDataAPI(bookId, 0, 100);
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

  return (
    <>
      <Layout>
        <Container>
          <LeftArea width={width} isOpened={isOpened}>
            <PDFContainer>
              <TopBar>
                <StyledFaChevronLeft size={48} onClick={() => navigate('/')} />
                <Menu>
                  <MenuIcon onClick={toggleDropdown}>
                    <StyledFaBars size={48} />
                  </MenuIcon>
                  {isDropdownOpen && (
                    <DropdownMenu>
                      <DropdownItem
                        onClick={() => {
                          setIsOpened(true);
                          setSelectedTab('인물관계도');
                          fetchPeopleData();
                        }}
                      >
                        인물관계도
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          setIsOpened(true);
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
              {filePath && (
                <PDFViewerOriginal
                  path={filePath}
                  pageNumber={pageNumber}
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

          {isOpened && <SplitDivider onMouseDown={handleMouseDown} />}

          {isOpened && selectedTab === '인물관계도' && (
            <GenAIContainer
              width={`calc(100% - ${width}px)`}
              isOpened={isOpened}
            >
              <NetworkGraph data={networkData} />
              {/* {networkData ? (
                <NetworkGraph data={networkData} />
              ) : (
                <LoadingSpinner />
              )} */}
            </GenAIContainer>
          )}
          {isOpened && selectedTab === '그림일기' && diaryKeyword && (
            <GenAIContainer
              width={`calc(100% - ${width}px)`}
              isOpened={isOpened}
            >
              {bookId && (
                <PictureDiary bookId={bookId} sentence={diaryKeyword} />
              )}
            </GenAIContainer>
          )}
          {isOpened && selectedTab === '지난줄거리' && (
            <GenAIContainer
              width={`calc(100% - ${width}px)`}
              isOpened={isOpened}
            >
              {bookId && <StorySummary bookId={bookId} page={pageNumber} />}
            </GenAIContainer>
          )}
        </Container>
      </Layout>
    </>
  );
};

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
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
  min-width: 600px;
  width: ${({ width, isOpened }) => (!isOpened ? '100%' : `${width}px`)};
`;

const PDFContainer = styled.div`
  position: relative;
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
  padding: 1rem;
  flex-direction: column;
  align-items: end;
`;

const MenuIcon = styled.div`
  cursor: pointer;
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

export default Book;
