import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import { getDiaryPictureAPI } from '../../api/openai';
import { IoMdRefresh } from 'react-icons/io';
import CustomSelector from '../CustomSelector/CustomSelector';
import { fontFamily } from 'html2canvas/dist/types/css/property-descriptors/font-family';
import Lottie from 'react-lottie';
import animationData from '../../constants/drawing_loading.json';
import FailureLottie from '../Lotties/FailureLottie';
import Draggable from 'react-draggable';

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
    fontSize: string;
  } | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('#000000');
  const [selectedFontSize, setSelectedFontSize] = useState<string>('24px');
  const [selectedFontFamily, setSelectedFontFamily] =
    useState<string>('nanumsquare');
  const [selectedImageStyle, setSelectedImageStyle] = useState<string>('anime');
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isFailed, setIsFailed] = useState<boolean>(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const handleDownloadImage = () => {
    if (imageContainerRef.current) {
      html2canvas(imageContainerRef.current, {
        useCORS: true,
        allowTaint: true,
        logging: true,
        width: imageContainerRef.current.clientWidth,
        height: imageContainerRef.current.clientHeight,
        backgroundColor: null,
      }).then((canvas) => {
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

  const handleImageStyle = (imageStyle: string) => {
    switch (imageStyle) {
      case '애니메이션':
        setSelectedImageStyle('anime');
        break;
      case '꿈':
        setSelectedImageStyle('dreamscape');
        break;
    }
  };

  const handleFontSize = (fontSize: string) => {
    switch (fontSize) {
      case '작게':
        setSelectedFontSize('16px');
        break;
      case '보통':
        setSelectedFontSize('24px');
        break;
      case '크게':
        setSelectedFontSize('36px');
        break;
    }
  };

  const handleFontFamily = (fontFamily: string) => {
    switch (fontFamily) {
      case '나눔고딕':
        setSelectedFontFamily('nanumgothic');
        break;
      case '나눔스퀘어':
        setSelectedFontFamily('nanumsquare');
        break;
      case '망고또박':
        setSelectedFontFamily('MangoDdobak-R');
        break;
      case '갈메골':
        setSelectedFontFamily('Galmetgol');
        break;
    }
  };

  const fetchDiaryImage = async () => {
    setImage('');
    try {
      const data = await getDiaryPictureAPI(
        bookId,
        sentence,
        selectedImageStyle,
      );
      if (data.urls.length > 0) {
        setImage(data.urls[0]);
        setIsFailed(false);
      } else {
        setIsFailed(true);
      }
    } catch {
      setIsFailed(true);
    }
  };

  useEffect(() => {
    setDroppedText({
      text: sentence,
      x: 20,
      y: 20,
      color: selectedColor,
      fontSize: selectedFontSize,
    });
  }, [sentence]);

  useEffect(() => {
    fetchDiaryImage();
  }, []);

  return (
    <>
      <Container ref={containerRef}>
        <ImageContainer ref={imageContainerRef}>
          {!image && !isFailed && <Lottie options={defaultOptions} />}
          {isFailed && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <FailureLottie />
              <h1 style={{ margin: 'auto' }}>
                이미지를 가져오는데 실패했습니다.
              </h1>
            </div>
          )}
          {image && (
            <img
              draggable={false}
              src={image}
              alt=""
              width={'100%'}
              height={'100%'}
              style={{ zIndex: 1200 }}
            />
          )}
          {image && droppedText && (
            <Draggable bounds="parent" defaultPosition={{ x: 20, y: 20 }}>
              <DroppedText
                style={{
                  color: droppedText.color,
                  fontSize: selectedFontSize,
                  fontFamily: selectedFontFamily,
                }}
              >
                {droppedText.text}
              </DroppedText>
            </Draggable>
          )}
        </ImageContainer>

        <EditContainer>
          <OptionContainer>
            <CustomLabel>그림체</CustomLabel>
            <CustomSelector
              options={['애니메이션', '꿈']}
              defaultOption="애니메이션"
              onSelect={(s) => {
                handleImageStyle(s);
              }}
            />
          </OptionContainer>
          <OptionContainer>
            <CustomLabel>텍스트</CustomLabel>
            <CustomSelector
              options={['나눔고딕', '나눔스퀘어', '망고또박', '갈메골']}
              defaultOption="나눔고딕"
              onSelect={(s) => {
                handleFontFamily(s);
              }}
            />
            <ColorPicker
              type="color"
              value={selectedColor}
              onChange={handleColorChange}
            />
            <CustomSelector
              options={['작게', '보통', '크게']}
              defaultOption="보통"
              onSelect={(s) => {
                handleFontSize(s);
              }}
            />
          </OptionContainer>
        </EditContainer>
        <ButtonContainer>
          <Button onClick={() => fetchDiaryImage()}>재생성</Button>
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

  @media (max-width: 1224px) {
    width: 80vw;
    height: 80vh;
  }
`;

const TextContainer = styled.div`
  display: flex;
  font-size: 24px;
  font-weight: bold;
  margin: 0 auto;
  cursor: grab;
`;

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;

  margin-top: 2rem;
  padding: 1rem;
  border-radius: 15px;
  background-color: #fef7da;

  @media (max-width: 1224px) {
    width: 80%;
    height: 30%;
    margin: 0.4rem;
    padding: 0.4rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 500px;
  flex-direction: row;
  justify-content: flex-end;
  gap: 1rem;
  @media (max-width: 1224px) {
    width: 80%;
  }
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1rem 0;
  gap: 1.5rem;
`;

const CustomLabel = styled.label`
  margin-right: 10px;
  font-size: 24px;

  @media (max-width: 769px) {
    font-size: 10px;
  }

  @media (max-width: 1224px) {
    font-size: 16px;
  }
`;

const ColorPicker = styled.input`
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
`;

const ImageContainer = styled.div`
  display: flex;
  width: 512px;
  height: 512px;
  background-color: #ffd953;
  position: relative;
  border-radius: 1rem;
  z-index: 1000;
  align-items: center;

  @media (max-width: 1224px) {
    width: 400px;
    height: 400px;
    > img {
      object-fit: contain;
      border-radius: 1rem;
    }
  }

  @media (max-width: 767px) {
    width: 256px;
    height: 256px;
    > img {
      object-fit: contain;
      border-radius: 0.5;
    }
  }
`;

const DroppedText = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #dbc4c4;
  position: absolute;
  z-index: 2000;
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

  @media (max-width: 1224px) {
    font-size: 12px;
  }
`;
export default PictureDiary;
