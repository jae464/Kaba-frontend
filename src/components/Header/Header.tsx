import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  /* position: fixed; */
  min-height: 4rem;
  height: 4rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;

  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom: 1px outset;
  /* background-color: black; */
  width: 100%;
  overflow-x: auto;
`;

const Logo = styled.div`
  color: #ffd026;
  margin: 0 auto;
  font-family: 'MangoDdobak-B';
  font-size: 24px;
  cursor: pointer;
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

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <Logo onClick={() => navigate('/')}>KABA</Logo>
    </HeaderContainer>
  );
};

export default Header;
