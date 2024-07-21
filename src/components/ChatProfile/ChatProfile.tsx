import React from 'react';
import styled from 'styled-components';
import { Profile } from '../../type/profile';
import { useMediaQuery } from 'react-responsive';

interface ChatProfileProps {
  profile: Profile;
  isSelected: boolean;
  // setSelectedProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
  onClickProfile: (profile: Profile) => void;
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
  // setSelectedProfile,
  onClickProfile,
}: ChatProfileProps) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <ChatProfileContainer
      highlight={isSelected}
      onClick={() =>
        // setSelectedProfile(profile)
        onClickProfile(profile)
      }
    >
      <ProfileImage src={profile.imageSrc} alt={profile.name} />
      {!isMobile && <ProfileName>{profile.name}</ProfileName>}
    </ChatProfileContainer>
  );
};

export default ChatProfile;
