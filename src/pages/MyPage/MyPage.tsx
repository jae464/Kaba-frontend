import styled from 'styled-components';
import Layout from '../../components/Layout/Layout';

const MyPage = () => {
  return (
    <>
      <Layout>
        <Container>
          <h1 style={{ margin: 'auto', fontSize: '4rem' }}>준비중</h1>
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

export default MyPage;
