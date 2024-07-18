import styled from 'styled-components';
import Layout from '../../components/Layout/Layout';
import BookThumbnail from '../../components/BookThumbnail/BookThumbnail';
import { books } from '../../constants/sampleData';
import { useNavigate } from 'react-router-dom';
import { getAllBooksAPI } from '../../api/openai';
import { useEffect, useState } from 'react';
import { BooksData } from '../../type/api/book';

const Chat = () => {
  const [books, setBooks] = useState<BooksData | null>(null);

  const navigate = useNavigate();

  const fetchBooksData = async () => {
    const data = await getAllBooksAPI();
    console.log('fetchBooksData : ' + data);
    setBooks(data);
  };

  useEffect(() => {
    fetchBooksData();
  }, []);

  return (
    <>
      <Layout>
        <Container>
          <Layer style={{ backgroundColor: '#F7FBFF' }}>
            <Title>감상한 작품</Title>
            <BookList>
              {books?.books.slice(0, 1).map((book, index) => (
                <BookThumbnail
                  key={index}
                  id={book.id}
                  image={book.thumbnail_image}
                  title={book.title}
                  description={book.description}
                  exist={book.is_exist}
                  onClick={(id) => {
                    navigate(`/chatroom/${id}`);
                  }}
                />
              ))}
            </BookList>
          </Layer>
        </Container>
      </Layout>
    </>
  );
};

const Container = styled.div`
  padding: 0 50px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin-top: 1rem;
  margin-left: 0.5rem;
`;

const Layer = styled.div`
  border-radius: 1rem;
  padding: 1rem;
  margin: 3rem 0;
  width: 100%;
`;

const BookList = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  // flex-wrap: wrap;
  // justify-content: center;
`;

export default Chat;
