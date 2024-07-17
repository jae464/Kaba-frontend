import React from 'react';
import Header from '../../components/Header/Header';
import styled from 'styled-components';
import SideBar from '../../components/SideBar/SideBar';
import NetworkGraph from '../../components/NetworkGraph/NetworkGraph';
import { peopleDatas } from '../../constants/sampleData';
import Layout from '../../components/Layout/Layout';
import { FaRegLightbulb } from 'react-icons/fa';

const Connection = () => {
  return (
    <>
      <Layout>
        <Container>
          <FaRegLightbulb size={128} />
          <h1 style={{ fontSize: '4em' }}>준비중입니다!</h1>
        </Container>
      </Layout>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #fef7da;
  padding: 0 50px;
`;

export default Connection;
