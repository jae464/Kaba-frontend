import styled from 'styled-components';
import { BeatLoader } from 'react-spinners';

interface LoadingSpinnerProps {
  color?: string;
}
const LoadingSpinner = ({ color = 'white' }: LoadingSpinnerProps) => {
  return (
    <>
      <Container>
        <BeatLoader
          size={12}
          margin={'auto'}
          loading={true}
          style={{ alignItems: 'center' }}
          color={color}
        />
      </Container>
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
`;

export default LoadingSpinner;
