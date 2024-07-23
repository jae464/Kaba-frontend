import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import Tabs from '../Tabs/Tabs';
import { tutorials_desk, tutorials_mobile } from '../../constants/tutorials';
import { IoIosClose, IoIosCloseCircleOutline } from 'react-icons/io';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5000;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  width: 80%;
  height: 90%;

  @media (max-width: 767px) {
    padding: 12px;
  }
`;

const TutorialModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [tutorials, setTutorials] = useState(tutorials_desk);
  const [selectedTab, setSelectedTab] = useState(tutorials[0].title);
  const [currentIndex, setCurrentIndex] = useState(0);

  const selectedTutorial = tutorials.find(
    (tutorial) => tutorial.title === selectedTab,
  );
  const handleNext = () => {
    if (selectedTutorial && currentIndex < selectedTutorial.items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    if (isMobile) {
      setTutorials(tutorials_mobile);
    } else {
      setTutorials(tutorials_desk);
    }
  }, [isMobile]);

  return (
    <ModalOverlay>
      <ModalContent>
        <StyledIoIosCloseCircleOutline size={48} onClick={onClose} />
        <Tabs
          tabs={tutorials.map((tutorial) => tutorial.title)}
          selectedTab={selectedTab}
          onSelectTab={(tab) => {
            setSelectedTab(tab);
            setCurrentIndex(0);
          }}
        />
        {selectedTutorial && (
          <TutorialItemContainer>
            <TutorialImage
              src={selectedTutorial.items[currentIndex].img_url}
              alt={selectedTutorial.items[currentIndex].description}
            />
            <TutorialDescription>
              {selectedTutorial.items[currentIndex].description}
            </TutorialDescription>
            <PageButtonContainer>
              <StyledFaChevronLeft size={48} onClick={handlePrevious} />
              {currentIndex + 1} / {selectedTutorial.items.length}
              <StyledFaChevronRight size={48} onClick={handleNext} />
            </PageButtonContainer>
          </TutorialItemContainer>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

const TutorialItemContainer = styled.div`
  display: flex;
  height: 80%;
  max-height: 100%;
  overflow-y: auto;
  /* background-color: black; */
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
`;

const TutorialImage = styled.img`
  max-width: 65%;
  height: auto;
  max-height: 80%;
  margin-top: 2rem;
  margin-bottom: 10px;
`;

const TutorialDescription = styled.p`
  font-size: 16px;
  text-align: center;
`;

const StyledIoIosCloseCircleOutline = styled(IoIosClose)`
  cursor: pointer;
  color: #ffd953;
  margin-left: auto;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 2rem;
  &:hover {
    background-color: #282c34;
  }
`;

const PageButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
`;

const StyledFaChevronLeft = styled(FaChevronLeft)`
  color: #ffd953;

  padding: 0.5rem;
  border-radius: 2rem;
  cursor: pointer;
  &:hover {
    background-color: #282c34;
  }
`;

const StyledFaChevronRight = styled(FaChevronRight)`
  color: #ffd953;
  padding: 0.5rem;
  border-radius: 2rem;
  cursor: pointer;
  &:hover {
    background-color: #282c34;
  }
`;

export default TutorialModal;
