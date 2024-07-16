import styled from 'styled-components';
import { StoryData } from '../../type/api/story';
import { useEffect, useState } from 'react';
import { getSummaryAPI } from '../../api/openai';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

interface StorySummaryProps {
  bookId: string;
  page: number;
}
const StorySummary = ({ bookId, page }: StorySummaryProps) => {
  const [summary, setSummary] = useState<StoryData | null>(null);
  const [summaryPage, setSummaryPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getSummary = async () => {
    setIsLoading(true);
    const datas = await getSummaryAPI(bookId, 0, 100);
    console.log('summary : ' + datas.stories);
    setSummary(datas);
    setIsLoading(false);
  };

  useEffect(() => {
    getSummary();
  }, []);

  return (
    <>
      <Container>
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

        <SummaryBox>
          {isLoading && <LoadingSpinner />}
          {!isLoading && summary && (
            <>
              <ImageContainer src={summary.stories[summaryPage].picture} />
              <TextContainer>
                {summary.stories[summaryPage].story}
              </TextContainer>
            </>
          )}
        </SummaryBox>

        <ChevronContainer>
          {summary && summaryPage < summary?.stories.length - 1 && (
            <StyledFaChevronRight
              size={48}
              onClick={() => setSummaryPage((prev) => prev + 1)}
            />
          )}
        </ChevronContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  margin-left: 2rem;
  align-items: center;
  margin-right: 2rem;
`;

const SummaryBox = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  height: 84vh;
  justify-content: center;
  align-items: center;
  overflow: auto;
  border-radius: 15px;
  /* border: 1px solid #ccc; */
  background-color: #ffe898;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled.img`
  width: 400px;
  height: 400px;
  border-radius: 1rem;
`;

const TextContainer = styled.p`
  padding: 1rem;
  margin: 2rem;
  min-height: 10rem;
  width: 90%;
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

export default StorySummary;
