import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import styled from 'styled-components';
import { WikiData } from '../../type/api/wiki';
import { getWikiAPI } from '../../api/openai';
import Draggable from 'react-draggable';
import Lottie from 'react-lottie';
import animationData from '../../constants/book_loading.json';

interface KabaWikiProps {
  bookId: string;
  search: string;
  onClickClose: () => void;
}

const KabaWiki = ({ bookId, search, onClickClose }: KabaWikiProps) => {
  const [wiki, setWiki] = useState<WikiData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const fetchWikiData = async () => {
    setIsLoading(true);
    const data = await getWikiAPI(bookId, search);
    setWiki(data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchWikiData();
  }, []);

  return (
    <>
      <Draggable handle=".draggable-handle">
        <Container>
          <Header>
            <HeaderTitle className="draggable-handle">KABA 위키</HeaderTitle>

            <IoMdClose size={28} onClick={onClickClose} />
          </Header>

          <Content>
            <Title>{search}</Title>
            {isLoading && <Lottie options={defaultOptions} />}
            {!isLoading && wiki && (
              <div style={{ lineHeight: '1.5rem' }}>{wiki.response}</div>
            )}
          </Content>
        </Container>
      </Draggable>
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
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const HeaderTitle = styled.div`
  flex-grow: 1;
  text-align: center;
  font-size: 1.3rem;
  font-weight: bold;
  margin-left: 12px;
  width: 100%;
`;

const Title = styled.span`
  display: flex;
  font-size: 1.3rem;
  justify-content: center;
  width: 100%;
  /* overflow: hidden; */
  font-style: italic;
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
