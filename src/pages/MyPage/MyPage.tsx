import styled from 'styled-components';
import Layout from '../../components/Layout/Layout';
import { FaRegLightbulb } from 'react-icons/fa';

const MyPage = () => {
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

export default MyPage;
