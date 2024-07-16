import React from 'react';
import styled from 'styled-components';
import { Profile } from '../../type/profile';

interface ChatProfileProps {
  profile: Profile;
  isSelected: boolean;
  setSelectedProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
}

const ChatProfileContainer = styled.div<{ highlight?: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  background-color: ${(props) => (props.highlight ? '#FFE17E' : 'transparent')};
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ProfileName = styled.span`
  font-size: 16px;
`;

const ChatProfile = ({
  profile,
  isSelected,
  setSelectedProfile,
}: ChatProfileProps) => {
  return (
    <ChatProfileContainer
      highlight={isSelected}
      onClick={() => setSelectedProfile(profile)}
    >
      <ProfileImage src={profile.imageSrc} alt={profile.name} />
      <ProfileName>{profile.name}</ProfileName>
    </ChatProfileContainer>
  );
};

export default ChatProfile;
