import styled, { keyframes } from 'styled-components';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { BeatLoader } from 'react-spinners';
import { useEffect, useState } from 'react';

interface ChatBubbleProps {
  type: 'user' | 'other';
  name: string;
  profileImage: string;
  message: string;
  isLoading?: boolean;
}

const loadingMessages = [
  '대답을 고민중입니다...',
  '생각에 잠겼습니다...',
  '답변을 준비중입니다...',
  '곧 대답할거에요...',
  '잠시만 기다려달라고 합니다...',
  '머리를 긁적이고 있습니다...',
  '답변을 곰곰이 생각하고 있습니다...',
];

const ChatBubble = ({
  type,
  name,
  profileImage,
  message,
  isLoading = false,
}: ChatBubbleProps) => {
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingMessage((prevMessage) => {
          const currentIndex = loadingMessages.indexOf(prevMessage);
          const nextIndex = (currentIndex + 1) % loadingMessages.length;
          return loadingMessages[nextIndex];
        });
      }, 4000); // 2초마다 메시지 변경

      return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
    }
  }, [isLoading]);

  return (
    <>
      <Container type={type}>
        {type === 'other' && (
          <>
            <ProfileImage src={profileImage} />

            {isLoading ? (
              <Bubble type={type}>
                <div
                  style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}
                >
                  <FadingText>
                    {name}가(이) {loadingMessage}
                  </FadingText>
                </div>
              </Bubble>
            ) : (
              <Bubble type={type}>{message}</Bubble>
            )}
          </>
        )}
        {type === 'user' && (
          <>
            <Bubble type={type}>{message}</Bubble>
            <ProfileImage src={profileImage} />
          </>
        )}
      </Container>
    </>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div<{ type: 'user' | 'other' }>`
  display: flex;
  padding: 1rem;
  align-items: center;
  width: 70%;
  max-width: 60rem;
  margin: ${({ type }) => (type === 'user' ? '0 0 0 auto' : '0 auto 0 0')};
`;

const ProfileImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin: 0 10px;
`;

const Bubble = styled.p<{ type: 'user' | 'other' }>`
  display: flex;
  /* justify-content: ${({ type }) =>
    type === 'user' ? 'flex-end' : 'start'}; */
  width: 100%;
  /* max-width: 40rem; */
  border-radius: 1rem;
  padding: 1rem;
  background-color: ${({ type }) => (type === 'user' ? '#FFE17E' : 'white')};
`;

const FadingText = styled.span`
  animation: ${fadeIn} 2s infinite alternate;
`;
export default ChatBubble;
