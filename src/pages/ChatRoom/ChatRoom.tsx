import styled from 'styled-components';
import Layout from '../../components/Layout/Layout';
import { FaAnglesLeft } from 'react-icons/fa6';
import {
  diaryImages,
  profiles,
  profilesData,
  profilesData_1,
  sampleChats,
} from '../../constants/sampleData';
import ChatProfile from '../../components/ChatProfile/ChatProfile';
import { useEffect, useRef, useState } from 'react';
import { ChatData } from '../../type/api/chat';
import { Profile } from '../../type/profile';
import ChatBubble from '../../components/ChatBubble/ChatBubble';
import { getCharactersAPI, postMessageAPI } from '../../api/openai';

import { IoMdSend } from 'react-icons/io';
import { Chat } from '../../type/chat';
import { Message } from '../../api/request/MessageRequest';
import { useParams } from 'react-router-dom';

const ChatRoom = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [chats, setChats] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { bookId } = useParams();

  const fetchProfiles = async () => {
    if (bookId != null) {
      const data = await getCharactersAPI(Number(bookId));
      setProfiles(data);
    }
  };

  const sendMessage = async () => {
    if (message !== '' && selectedProfile != null) {
      setChats((prev) => [...prev, { role: 'user', content: message }]);
      setMessage('');
      setIsSending(true);

      console.log(`보낼 메시지들 : ${chats}`);

      const answer = await postMessageAPI({
        character: selectedProfile.name,
        messages: [...chats, { role: 'user', content: message }],
      });
      setChats((prev) => [
        ...prev,
        { role: 'assistant', content: answer.response },
      ]);
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);
  useEffect(() => {
    if (selectedProfile != null) {
      // clearChatHistoryAPI(selectedProfile.name);
      setChats([
        {
          role: 'assistant',
          content: `안녕 나는 ${selectedProfile.name} 라고해! 반가워!`,
          // name: selectedProfile.name,
          // message: `안녕 나는 ${selectedProfile.name} 라고해! 반가워!`,
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

  return (
    <>
      <Layout>
        <Container>
          <CharacterList>
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
                    type={v.role === 'user' ? 'user' : 'assistant'}
                    name={selectedProfile.name}
                    profileImage={
                      v.role === 'user'
                        ? diaryImages[0].picture_url
                        : selectedProfile?.imageSrc
                    }
                    message={v.content}
                  />
                ))}
              {/* {isSending && <LoadingSpinner color="black" />} */}
              {isSending && selectedProfile && (
                <ChatBubble
                  type={'assistant'}
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
                  onKeyDown={handleKeyPress}
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
  @media (max-width: 767px) {
    width: 6rem;
  }
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
