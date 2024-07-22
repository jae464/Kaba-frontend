import styled from 'styled-components';

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  width: 100%;
  justify-content: space-between;
`;

const Tab = styled.div<{ selected: boolean }>`
  display: flex;
  padding: 10px 20px;
  overflow-x: auto;
  cursor: pointer;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  /* border: 0.3px solid black; */
  background-color: ${({ selected }) => (selected ? '#ffd953' : '#fef7da')};
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  border-bottom: ${({ selected }) => (selected ? '2px solid black' : 'none')};
  font-weight: bold;
`;

interface TabsProps {
  tabs: string[];
  selectedTab: string;
  onSelectTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, selectedTab, onSelectTab }) => {
  return (
    <TabsContainer>
      {tabs.map((tab) => (
        <Tab
          key={tab}
          selected={tab === selectedTab}
          onClick={() => onSelectTab(tab)}
        >
          {tab}
        </Tab>
      ))}
    </TabsContainer>
  );
};

export default Tabs;
