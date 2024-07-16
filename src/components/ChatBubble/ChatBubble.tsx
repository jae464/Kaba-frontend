import styled from 'styled-components';

interface ChatBubbleProps {
  type: 'user' | 'other';
  profileImage: string;
  message: string;
}

const ChatBubble = ({ type, profileImage, message }: ChatBubbleProps) => {
  return (
    <>
      <Container type={type}>
        {type === 'other' && (
          <>
            <ProfileImage src={profileImage} />
            <Bubble type={type}>{message}</Bubble>
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
  background-color: white;
`;
export default ChatBubble;
