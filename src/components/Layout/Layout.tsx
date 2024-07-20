import { ReactElement } from 'react';
import Header from '../Header/Header';
import styled from 'styled-components';
import SideBar from '../SideBar/SideBar';

interface LayoutProps {
  children: ReactElement;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Container>
        <Header />

        <Main>
          <SideBar />
          <Content>{children}</Content>
        </Main>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  height: 100vh;
  overflow-x: auto;
`;

const Main = styled.div`
  display: flex;
  flex: 1;
`;

const Content = styled.main`
  flex: 1;
`;

export default Layout;
