import { ReactElement, useState } from 'react';
import Header from '../Header/Header';
import styled from 'styled-components';
import SideBar from '../SideBar/SideBar';
import { useMediaQuery } from 'react-responsive';

interface LayoutProps {
  children: ReactElement;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <>
      <Container>
        <Header />
        <Main>
          {!isMobile && <SideBar />}
          <Content>{children}</Content>
        </Main>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100dvw;
  height: 100dvh;
  overflow-x: auto;
`;

const Main = styled.div`
  display: flex;
  height: 100%;
  flex: 1;
`;

const Content = styled.main`
  flex: 1;
  height: 100%;
`;

const TutorialContainer = styled.div``;

export default Layout;
