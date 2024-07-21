import React, { useState } from 'react';
import styled from 'styled-components';

const SelectorButton = styled.button`
  padding: 1rem;
  width: 8rem;
  background-color: #ffe898;
  border-radius: 1rem;
  overflow: hidden; /* 내용이 넘칠 경우 숨김 */

  @media (max-width: 1224px) {
    width: 6rem;
    font-size: 12px;
  }

  @media (max-width: 767px) {
    width: 4rem;
    font-size: 8px;
    white-space: nowrap; /* 텍스트를 한 줄로 표시 */
  }
`;

const OptionList = styled.ul<{ visible: boolean }>`
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  padding: 0;
  margin: 0;
  list-style: none;
  width: 100px;
  z-index: 1000;
`;

const OptionItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 769px) {
    font-size: 10px;
  }

  @media (max-width: 1224px) {
    font-size: 16px;
  }
`;

interface CustomSelectorProps {
  options: string[];
  defaultOption: string;
  onSelect: (option: string) => void;
}

const CustomSelector: React.FC<CustomSelectorProps> = ({
  options,
  defaultOption,
  onSelect,
}) => {
  const [listVisible, setListVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const toggleList = () => {
    setListVisible(!listVisible);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
    setListVisible(false);
    onSelect(option);
  };

  return (
    <div style={{ position: 'relative' }}>
      <SelectorButton onClick={toggleList}>{selectedOption}</SelectorButton>
      <OptionList visible={listVisible}>
        {options.map((option) => (
          <OptionItem key={option} onClick={() => selectOption(option)}>
            {option}
          </OptionItem>
        ))}
      </OptionList>
    </div>
  );
};

export default CustomSelector;
