import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import { getDiaryPictureAPI } from '../../api/openai';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

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
    console.log(
      `rect : ${rect.top} ${rect.bottom} ${rect.left} ${rect.right} ${rect.height}`,
    );
    console.log(e.clientX, e.clientY);

    setDroppedText({
      text: data,
      x: e.clientX - rect.left - dragOffset.x,
      y: e.clientY - rect.top - dragOffset.y,
      color: selectedColor,
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const fetchDiaryImage = async () => {
    const data = await getDiaryPictureAPI(bookId, sentence, '');
    setImage(data.picture_url);
  };

  useEffect(() => {
    setDroppedText(null);
  }, [sentence]);

  useEffect(() => {
    fetchDiaryImage();
  }, []);

  return (
    <>
      <Container ref={containerRef}>
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
        <Button onClick={handleDownloadImage}>저장하기</Button>
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
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: auto;
`;

const TextContainer = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  cursor: grab;
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
  width: 600px;
  height: 400px;
  position: relative;
  border-radius: 1rem;
`;

const DroppedText = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: black;
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
