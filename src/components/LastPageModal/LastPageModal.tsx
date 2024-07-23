import styled from 'styled-components';

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
  height: 30%;
  background-color: #fef7da;
  overflow: auto;
`;

interface LastPageModalProps {
  onClickYes: () => void;
  onClickNo: () => void;
}

const LastPageModal = ({ onClickYes, onClickNo }: LastPageModalProps) => {
  return (
    <>
      <ModalOverlay>
        <ModalContent>
          <p>최근 읽은 페이지로 이동하시겠습니까?</p>
          <button onClick={onClickYes}>YES</button>
          <button onClick={onClickNo}>NO</button>
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default LastPageModal;
