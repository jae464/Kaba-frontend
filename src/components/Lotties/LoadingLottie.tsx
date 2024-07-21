import Lottie from 'react-lottie';
import animationData from '../../constants/book_loading.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const LoadingLottie = () => {
  return (
    <>
      <Lottie options={defaultOptions} />
    </>
  );
};

export default LoadingLottie;
