import styled from 'styled-components';
import { StoryData } from '../../type/api/story';
import { useEffect, useState } from 'react';
import { getSummaryAPI } from '../../api/openai';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Lottie from 'react-lottie';
import animationData from '../../constants/book_loading.json';
import FailureLottie from '../Lotties/FailureLottie';
import LoadingLottie from '../Lotties/LoadingLottie';

interface StorySummaryProps {
  bookId: string;
  page: number;
}
const StorySummary = ({ bookId, page }: StorySummaryProps) => {
  const [summary, setSummary] = useState<StoryData | null>(null);
  const [summaryPage, setSummaryPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const getSummary = async () => {
    setIsLoading(true);
    try {
      const datas = await getSummaryAPI(bookId, 1, page, '애니메이션');
      console.log('summary : ' + datas.response);
      if (!datas || datas.response.length === 0) {
        setIsFailed(true);
      } else {
        setSummary(datas);
        setIsFailed(false);
      }
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      setIsFailed(true);
    }
  };

  useEffect(() => {
    getSummary();
  }, [page]);

  return (
    <>
      <Container>
        <Title>지난줄거리</Title>
        <p style={{ marginTop: '1rem' }}>
          <span style={{ fontWeight: 'bold' }}>{page} 페이지</span>까지의
          줄거리입니다.
        </p>
        <SummaryBox>
          {isLoading && !isFailed && <LoadingLottie />}
          {!isLoading && summary && summary.response.length > 0 && (
            <>
              <ImageContainer src={summary.response[summaryPage].img_url[0]} />
              <StoryContainer>
                <ChevronContainer>
                  {summaryPage > 0 && (
                    <StyledFaChevronLeft
                      size={48}
                      onClick={() => {
                        setSummaryPage((prev) => prev - 1);
                      }}
                    />
                  )}
                </ChevronContainer>
                <TextContainer>
                  {summary.response[summaryPage].sent}
                </TextContainer>
                <ChevronContainer>
                  {summary && summaryPage < summary?.response.length - 1 && (
                    <StyledFaChevronRight
                      size={48}
                      onClick={() => setSummaryPage((prev) => prev + 1)}
                    />
                  )}
                </ChevronContainer>
              </StoryContainer>
            </>
          )}
          {!isLoading && isFailed && (
            <LoadingContainer>
              <FailureLottie />
              <p style={{ fontSize: '1rem' }}>
                서버에서 데이터를 받아오는데 실패했습니다. 다시 시도해주세요.
              </p>
            </LoadingContainer>
          )}
        </SummaryBox>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 84vh;
  justify-content: center;
  margin-left: 2rem;
  align-items: center;
  margin-right: 2rem;
  position: relative;
  overflow: auto;
  border-radius: 15px;
  background-color: #ffe898;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 1224px) {
    width: 80vw;
    height: 80vh;
  }
`;

const Title = styled.h1`
  font-weight: bold;
  margin-top: 2rem;
  font-size: 1.7rem;
`;

const SummaryBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  /* height: 84vh; */
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.img`
  width: 400px;
  height: 400px;
  border-radius: 1rem;
  @media (max-width: 1224px) {
    width: 50%;
    height: 50%;
    > img {
      object-fit: contain;
      border-radius: 1rem;
    }
  }
`;

const StoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
`;

const TextContainer = styled.p`
  display: flex;
  flex-direction: row;
  padding: 1rem;
  margin: 2rem;
  min-height: 10rem;
  width: 80%;
  line-height: 1.5;
  border-radius: 1rem;
  background-color: #fef7da;
`;

const ChevronContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px; /* 아이콘의 크기와 동일하게 설정 */
`;

const StyledFaChevronLeft = styled(FaChevronLeft)`
  /* background-color: #fad346; */
  color: #ffd953;
  padding: 0.5rem;
  border-radius: 2rem;
  cursor: pointer;
  &:hover {
    background-color: #282c34;
  }
`;

const StyledFaChevronRight = styled(FaChevronRight)`
  /* background-color: #fad346; */
  color: #ffd953;
  padding: 0.5rem;
  border-radius: 2rem;
  cursor: pointer;
  &:hover {
    background-color: #282c34;
  }
`;

const LoadingContainer = styled.div`
  width: 80%;
  height: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export default StorySummary;
