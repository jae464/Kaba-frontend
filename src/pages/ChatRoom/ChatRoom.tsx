import styled from 'styled-components';
import Layout from '../../components/Layout/Layout';
import { FaAnglesLeft } from 'react-icons/fa6';
import {
  diaryImages,
  profiles,
  profilesData,
  sampleChats,
} from '../../constants/sampleData';
import ChatProfile from '../../components/ChatProfile/ChatProfile';
import { useEffect, useRef, useState } from 'react';
import { ChatData } from '../../type/api/chat';
import { Profile } from '../../type/profile';
import ChatBubble from '../../components/ChatBubble/ChatBubble';
import { getMessageAPI } from '../../api/openai';

import { IoMdSend } from 'react-icons/io';

const ChatRoom = () => {
  const [profiles, setProfiles] = useState(profilesData);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [chats, setChats] = useState<ChatData[]>([]);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (selectedProfile != null) {
      setChats([
        {
          name: selectedProfile.name,
          message: `안녕 나는 ${selectedProfile.name} 라고해! 반가워!`,
        },
      ]);
    }
  }, [selectedProfile]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [chats, isSending]);

  const sendMessage = async () => {
    if (message !== '' && selectedProfile != null) {
      setChats((prev) => [...prev, { name: 'user', message: message }]);
      setMessage('');
      setIsSending(true);
      const answer = await getMessageAPI('1', '어린왕자', message);
      setChats((prev) => [...prev, answer]);
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      <Layout>
        <Container>
          <CharacterList>
            <Header>
              <StyledFaAnglesLeft size={36} />
            </Header>
            {profiles.map((v) => (
              <ChatProfile
                profile={v}
                isSelected={v === selectedProfile}
                onClickProfile={(profile) => {
                  if (!isSending) {
                    setSelectedProfile(profile);
                  }
                }}
              />
            ))}
          </CharacterList>
          <ChatContainer>
            <ChatBubbleWrapper>
              {selectedProfile &&
                chats.map((v) => (
                  <ChatBubble
                    type={v.name === 'user' ? 'user' : 'other'}
                    name={selectedProfile.name}
                    profileImage={
                      v.name === 'user'
                        ? diaryImages[0].picture_url
                        : selectedProfile?.imageSrc
                    }
                    message={v.message}
                  />
                ))}
              {/* {isSending && <LoadingSpinner color="black" />} */}
              {isSending && selectedProfile && (
                <ChatBubble
                  type={'other'}
                  name={selectedProfile.name}
                  profileImage={selectedProfile?.imageSrc}
                  message={''}
                  isLoading={true}
                />
              )}
              <div ref={chatEndRef} />
            </ChatBubbleWrapper>
            {selectedProfile && (
              <SendContainer>
                <ChatInput
                  ref={inputRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isSending}
                />
                <button onClick={sendMessage} disabled={isSending}>
                  <IoMdSend size={32} />
                </button>
              </SendContainer>
            )}
          </ChatContainer>
        </Container>
      </Layout>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background-color: #fef7da;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: black; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ChatBubbleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* position: relative; */
  width: 100%;
  height: 80vh;
  /* background-color: black; */
  overflow-y: auto;
`;

const StyledFaAnglesLeft = styled(FaAnglesLeft)`
  margin: 1rem;
  color: #ffe898;
`;

const CharacterList = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 24rem;
  background-color: white;
`;

const SendContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-bottom: 2rem;
  align-items: center;
  /* overflow: hidden; */
  /* width: 100%; */
`;
const ChatInput = styled.input`
  display: flex;
  width: 80%;
  border-radius: 1rem;
  padding: 1rem;
  background-color: #fcd966;
  border: none;
  height: 3rem;
  &:disabled {
    background-color: #ddd;
  }
`;

export default ChatRoom;
