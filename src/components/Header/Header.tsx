import { useEffect, useState } from 'react';
import { FaBars, FaHome, FaRegQuestionCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { selectedItemState } from '../../atoms/sidebarState';
import styled from 'styled-components';
import { BsChatText } from 'react-icons/bs';
import TutorialModal from '../TutorialModal/TutorialModal';
import { useMediaQuery } from 'react-responsive';
import logo from '../../assets/images/kaba_logo.png';

const HeaderContainer = styled.header`
  /* position: fixed; */
  min-height: 4rem;
  height: 4rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom: 1px outset;
  /* background-color: black; */
  width: 100vw;
  overflow-x: auto;
`;

const Logo = styled.div`
  color: #ffd026;
  margin: 0 auto;
  font-family: 'MangoDdobak-B';
  font-size: 24px;
  cursor: pointer;

  > img {
    width: 48px;
    height: 48px;
  }
  @media (max-width: 767px) {
    margin: 0 auto;
    padding-left: 4rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavItem = styled.a`
  color: white;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    text-decoration: underline;
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  margin-left: auto;

  @media (min-width: 769px) {
    display: none;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 4rem;
  right: 0;
  width: 4rem;
  margin-right: 1rem;
  background-color: #ffe999;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 10px;
  z-index: 10;
`;

const DropdownMenuItem = styled.div<{ selected: boolean }>`
  padding: 10px;
  cursor: pointer;
  /* background-color: ${({ selected }) =>
    selected ? '#282c34' : 'transparent'}; */
`;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleItemClick = (path: string) => {
    setSelectedItem(path);
    navigate(path);
    setMenuOpen(false); // Close the menu after selection
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen]);

  return (
    <>
      <HeaderContainer>
        {isMobile && (
          <StyledFaRegQuestionCircle size={36} onClick={handleModalOpen} />
        )}
        <Logo onClick={() => navigate('/')}>
          <img src={logo} />
        </Logo>
        <MenuButton onClick={() => setMenuOpen(!isMenuOpen)}>
          <FaBars />
        </MenuButton>
        {!isMobile && (
          <StyledFaRegQuestionCircle size={36} onClick={handleModalOpen} />
        )}
        {isMenuOpen && (
          <DropdownMenu>
            <DropdownMenuItem
              selected={selectedItem === '/'}
              onClick={() => handleItemClick('/')}
            >
              <FaHome size={24} color="white" />
            </DropdownMenuItem>

            <DropdownMenuItem
              selected={selectedItem === '/chat'}
              onClick={() => handleItemClick('/chat')}
            >
              <BsChatText size={24} color="white" />
            </DropdownMenuItem>
          </DropdownMenu>
        )}
      </HeaderContainer>
      {isModalOpen && <TutorialModal onClose={handleModalClose} />}
    </>
  );
};

const StyledFaRegQuestionCircle = styled(FaRegQuestionCircle)`
  color: #ffd953;
  cursor: pointer;
`;

export default Header;
