import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import styled from 'styled-components';
import { WikiData } from '../../type/api/wiki';
import { getWikiAPI } from '../../api/openai';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

interface KabaWikiProps {
  bookId: string;
  search: string;
  onClickClose: () => void;
}

const KabaWiki = ({ bookId, search, onClickClose }: KabaWikiProps) => {
  const [wiki, setWiki] = useState<WikiData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchWikiData = async () => {
    setIsLoading(true);
    const data = await getWikiAPI(bookId, 0, 100, search);
    setWiki(data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchWikiData();
  }, []);

  return (
    <>
      <Container>
        <Header>
          <IoMdClose size={28} onClick={onClickClose} />
        </Header>

        <Content>
          <Title>{search}</Title>
          {isLoading && <LoadingSpinner color="black" />}
          {!isLoading && wiki && (
            <span style={{ lineHeight: '1.5rem' }}>{wiki.information}</span>
          )}
        </Content>
      </Container>
    </>
  );
};

const Container = styled.div`
  background-color: #fff0a3;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 20rem;
  height: 20rem;
  border-radius: 2rem;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
`;

const Title = styled.span`
  display: flex;
  font-size: 1.3rem;
  justify-content: center;
  width: 100%;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
  height: 100%;
  background-color: #fff7cc;
  overflow-y: auto;
  word-wrap: break-word;
  white-space: pre-wrap;
`;

export default KabaWiki;
