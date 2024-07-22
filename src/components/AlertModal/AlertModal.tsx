import { IoIosClose } from 'react-icons/io';
import Lottie from 'react-lottie';
import styled from 'styled-components';
import animationData from '../../constants/alert.json';
import { ReactElement } from 'react';

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
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  height: 80%;
  background-color: #fef7da;
  overflow: auto;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

interface AlertModalProps {
  children: ReactElement;
  onClose: () => void;
}
const AlertModal = ({ children, onClose }: AlertModalProps) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <>
      <ModalOverlay>
        <ModalContent>
          <StyledIoIosCloseCircleOutline size={48} onClick={onClose} />
          <TextContainer>{children}</TextContainer>
          <LottieContainer>
            <Lottie options={defaultOptions} style={{ objectFit: 'contain' }} />
          </LottieContainer>
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

const StyledIoIosCloseCircleOutline = styled(IoIosClose)`
  cursor: pointer;
  color: #ffd953;
  margin-left: auto;
  /* padding: 0.5rem; */
  margin-bottom: 1rem;
  border-radius: 2rem;
  &:hover {
    background-color: #282c34;
  }
`;

const TextContainer = styled.div`
  margin-top: 2rem;
  font-size: 24px;

  > p {
    line-height: 1.5;
  }

  @media (max-width: 767px) {
    margin-top: 0.5rem;
    font-size: 16px;
  }
`;
const LottieContainer = styled.div`
  display: flex;
  margin: auto 0;
  width: 16rem;
  height: 16rem;
`;

export default AlertModal;
