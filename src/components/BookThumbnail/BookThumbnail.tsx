import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface BookThumbnailProps {
  id: string;
  image: string;
  title: string;
  description: string;
  exist: boolean;
  onClick: (id: string) => void;
}

const BookThumbnail: React.FC<BookThumbnailProps> = ({
  id,
  image,
  title,
  description,
  exist,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (exist) {
      onClick(id);
    }
  };

  return (
    <Container onClick={handleClick} clickable={exist}>
      <BookImage src={image} alt={title} />
      <BookInfo>
        <BookTitle>{title}</BookTitle>
        <BookDescription>{description}</BookDescription>
      </BookInfo>
    </Container>
  );
};

const Container = styled.div<{ clickable: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  padding: 16px;

  margin-right: 30px;
  width: 220px;

  box-shadow: 4px 4px 6px 0px #e2e2e240;
  transition: transform 0.2s;
  background-color: white;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'not-allowed')};
  &:hover {
    transform: scale(1.05);
  }
`;

const BookImage = styled.img`
  width: 180px;
  height: 270px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const BookInfo = styled.div`
  text-align: center;
`;

const BookTitle = styled.h3`
  font-size: 1.2em;
  margin: 8px 0;
`;

const BookDescription = styled.p`
  font-size: 0.9em;
  color: #555;
`;

export default BookThumbnail;
