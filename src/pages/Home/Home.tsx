import styled from 'styled-components';
import { books } from '../../constants/sampleData';
import BookThumbnail from '../../components/BookThumbnail/BookThumbnail';
import Layout from '../../components/Layout/Layout';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BooksData } from '../../type/api/book';
import { getAllBooksAPI } from '../../api/openai';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const Home = () => {
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
            <Title>최근 본 작품</Title>
            {!books && (
              <div style={{ height: '270px' }}>
                <LoadingSpinner color="black" />
              </div>
            )}
            <BookList>
              {books?.books.slice(0, 3).map((book, index) => (
                <BookThumbnail
                  key={index}
                  id={book.id}
                  image={book.thumbnail_image}
                  title={book.title}
                  description={book.description}
                  exist={book.is_exist}
                  onClick={(id) => {
                    if (book.is_exist) {
                      navigate(`/book/${id}`);
                    }
                  }}
                />
              ))}
            </BookList>
          </Layer>
          <Layer style={{ backgroundColor: '#FFFCF2' }}>
            <Title>떠오르는 신간</Title>
            {!books && (
              <div style={{ height: '270px' }}>
                <LoadingSpinner color="black" />
              </div>
            )}
            <BookList>
              {books?.books.map((book, index) => (
                <BookThumbnail
                  key={index}
                  id={book.id}
                  image={book.thumbnail_image}
                  title={book.title}
                  description={book.description}
                  exist={book.is_exist}
                  onClick={(id) => {
                    if (book.is_exist) {
                      navigate(`/book/${id}`);
                    }
                  }}
                />
              ))}
            </BookList>
          </Layer>
          <Layer style={{ backgroundColor: '#FFF7FB' }}>
            <Title>요즘 뜨는 웹소설</Title>
            {!books && (
              <div style={{ height: '270px' }}>
                <LoadingSpinner color="black" />
              </div>
            )}
            <BookList>
              {books?.books.map((book, index) => (
                <BookThumbnail
                  key={index}
                  id={book.id}
                  image={book.thumbnail_image}
                  title={book.title}
                  description={book.description}
                  exist={book.is_exist}
                  onClick={(id) => {
                    if (book.is_exist) {
                      navigate(`/book/${id}`);
                    }
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

// const Layout = styled.div`
//   display: flex;
//   flex-direction: row;
//   height: 100%;
// `;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin-top: 1rem;
  margin-left: 0.5rem;
`;

const Container = styled.div`
  padding: 0 50px;
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

export default Home;
