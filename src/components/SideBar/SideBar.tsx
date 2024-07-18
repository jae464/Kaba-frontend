/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaBaby, FaHome, FaSearch } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { selectedItemState } from '../../atoms/sidebarState';
import { FaPerson, FaPersonRifle } from 'react-icons/fa6';
import { BsChatText, BsPeople } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';

const SideBarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  width: 80px;
  height: 100%;
  background-color: #ffe999;
  padding: 20px;
  align-items: center;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
`;

const ToggleButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
  color: white;
  // margin-left: auto;
  // &:hover {
  //   background-color: #282c34;
  // }
`;

const SideBarItem = styled.div<{ selected: boolean }>`
  display: flex;
  text-decoration: none;
  // width: 3.5rem;
  border-radius: 4rem;
  font-size: 1.5rem;
  justify-content: center;
  padding: 1rem 1rem;
  align-items: center;
  // background-color: white;
  margin: 0.3rem 1rem;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? '#282c34' : 'transparent')};
  &:hover {
    background-color: #282c34;
  }
`;

const SideBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);

  useEffect(() => {
    console.log(pathname);
  }, []);
  const handleItemClick = (path: string) => {
    setSelectedItem(path);
    navigate(path);
  };

  return (
    <>
      <SideBarContainer>
        <SideBarItem
          selected={selectedItem === '/'}
          onClick={() => handleItemClick('/')}
        >
          <FaHome size={24} color="white" style={{ alignItems: 'center' }} />
        </SideBarItem>

        <SideBarItem
          selected={selectedItem === '/chat'}
          onClick={() => handleItemClick('/chat')}
        >
          <BsChatText size={24} color="white" />
        </SideBarItem>
      </SideBarContainer>
    </>
  );
};

export default SideBar;
