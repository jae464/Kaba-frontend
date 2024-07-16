import React, { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';

interface SplitContainerProps {
  left: ReactNode;
  right: ReactNode;
}

const BookArea = styled.div<{ width: number }>`
  min-width: 700px;
  width: ${({ width }) => width}px;
`;
const SplitDivider = styled.div`
  width: 0.3rem;
  height: 100%;
  background-color: #93c5fd;
  cursor: col-resize;
  &:hover {
    background-color: #3b82f6;
  }
`;

const RightArea = styled.div`
  flex-grow: 1;
`;

const RightContent = styled.div`
  align-items: center;
  justify-content: center;
  margin: auto auto;
  width: 100%;
  height: 100%;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const SplitContainer = ({ left, right }: SplitContainerProps) => {
  const [isResizing, setIsResizing] = useState(false);
  const [initialX, setInitialX] = useState(0);
  const [width, setWidth] = useState(700);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('mouse down');
    setIsResizing(true);
    setInitialX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      const newWidth = width + e.clientX - initialX;
      setInitialX(e.clientX);
      if (newWidth >= 700 && newWidth <= 2800) {
        console.log(newWidth);
        setWidth(newWidth);
      }
    }
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <>
      <Container>
        <BookArea width={width}>{left}</BookArea>
        <SplitDivider onMouseDown={handleMouseDown} />
        <RightArea>
          <RightContent>{right}</RightContent>
        </RightArea>
      </Container>
    </>
  );
};

export default SplitContainer;
