import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import { getDiaryPictureAPI } from '../../api/openai';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { IoMdRefresh } from 'react-icons/io';

interface PictureDiaryProps {
  bookId: string;
  sentence: string;
}
const PictureDiary = ({ bookId, sentence }: PictureDiaryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [image, setImage] = useState<string>('');
  const [droppedText, setDroppedText] = useState<{
    text: string;
    x: number;
    y: number;
    color: string;
  } | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('#000000');
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const handleDownloadImage = () => {
    if (imageContainerRef.current) {
      html2canvas(imageContainerRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'picture-diary.png';
        link.click();
      });
    }
  };
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
    if (droppedText) {
      setDroppedText({
        ...droppedText,
        color: e.target.value,
      });
    }
  };
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', sentence);
    e.dataTransfer.effectAllowed = 'move';
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');

    const rect = imageContainerRef.current!.getBoundingClientRect();
    // console.log(
    //   `rect : ${rect.top} ${rect.bottom} ${rect.left} ${rect.right} ${rect.height}`,
    // );
    // console.log(e.clientX, e.clientY);

    setDroppedText({
      text: data,
      x: e.clientX - rect.left - dragOffset.x,
      y: e.clientY - rect.top - dragOffset.y,
      color: selectedColor,
    });

    // console.log(
    //   `현재 창의 너비와 높이 : ${window.innerWidth}, ${window.innerHeight}`,
    // );
    // console.log(`마우스의 위치 : ${e.clientX} ${e.clientY}`);
    // console.log(`이미지 컨테이너의 위치 : ${rect.left}, ${rect.top}`);
    // console.log(
    //   `드랍되는 위치 ${e.clientX - rect.left - dragOffset.x}, ${e.clientY - rect.top - dragOffset.y}`,
    // );
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const fetchDiaryImage = async () => {
    const data = await getDiaryPictureAPI(bookId, sentence, '');
    setImage(data.picture_url);
  };

  useEffect(() => {
    setDroppedText({ text: sentence, x: 20, y: 20, color: 'black' });
  }, [sentence]);

  useEffect(() => {
    fetchDiaryImage();
  }, []);

  return (
    <>
      <Container ref={containerRef}>
        <ImageContainer
          ref={imageContainerRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {!image && <LoadingSpinner />}
          {image && (
            <img
              draggable={false}
              src={image}
              alt=""
              width={'100%'}
              height={'100%'}
              style={{ zIndex: -1 }}
            />
          )}
          {droppedText && (
            <DroppedText
              draggable
              onDragStart={handleDragStart}
              style={{
                left: droppedText.x,
                top: droppedText.y,
                color: droppedText.color,
              }}
            >
              {droppedText.text}
            </DroppedText>
          )}
        </ImageContainer>

        <EditContainer>
          {!droppedText && (
            <TextContainer draggable onDragStart={handleDragStart}>
              {sentence}
            </TextContainer>
          )}
          <ColorPickerContainer>
            <ColorPickerLabel>색상 :</ColorPickerLabel>
            <ColorPicker
              type="color"
              value={selectedColor}
              onChange={handleColorChange}
            />
          </ColorPickerContainer>
        </EditContainer>
        <ButtonContainer>
          <Button>재생성</Button>
          <Button onClick={handleDownloadImage}>저장하기</Button>
        </ButtonContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  height: 84vh;
  justify-content: center;
  border-radius: 4rem;
  align-items: center;
  background-color: #ffe898;
  border-radius: 15px;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: auto;
`;

const TextContainer = styled.div`
  display: flex;
  font-size: 24px;
  font-weight: bold;
  margin: 0 auto;
  cursor: grab;
`;

const EditContainer = styled.div`
  width: 500px;
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 15px;
  background-color: #fef7da;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 500px;
  flex-direction: row;
  justify-content: flex-end;
  gap: 1rem;
`;

const ColorPickerContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ColorPickerLabel = styled.label`
  margin-right: 10px;
  font-size: 16px;
`;

const ColorPicker = styled.input`
  width: 32px;
  height: 32px;
  border: none;
  padding: 0;
`;

const ImageContainer = styled.div`
  width: 500px;
  height: 500px;
  position: relative;
  border-radius: 1rem;
  > img {
    border-radius: 1rem;
  }
`;

const DroppedText = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #dbc4c4;
  position: absolute;
  z-index: 1000;
  cursor: pointer;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 24px;
  cursor: pointer;
  background-color: white;
  color: black;
  border: none;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
export default PictureDiary;
