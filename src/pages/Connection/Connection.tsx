import React from 'react';
import Header from '../../components/Header/Header';
import styled from 'styled-components';
import SideBar from '../../components/SideBar/SideBar';
import NetworkGraph from '../../components/NetworkGraph/NetworkGraph';
import { peopleDatas } from '../../constants/sampleData';
import Layout from '../../components/Layout/Layout';

const Connection = () => {
  return (
    <>
      <Layout>
        <Container>
          <h1 style={{ margin: 'auto', fontSize: '4rem' }}>준비중.</h1>
        </Container>
      </Layout>
    </>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  /* background-color: black; */
  padding: 0 50px;
`;

export default Connection;
