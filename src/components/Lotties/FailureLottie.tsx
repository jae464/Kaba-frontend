import Lottie from 'react-lottie';
import animationData from '../../constants/server_error_2.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const FailureLottie = () => {
  return (
    <>
      <Lottie
        options={defaultOptions}
        style={{ width: '50%', height: '50%', objectFit: 'contain' }}
      />
    </>
  );
};

export default FailureLottie;
