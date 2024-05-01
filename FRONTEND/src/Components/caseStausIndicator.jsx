import styled from 'styled-components';

const StyledStatusIndicator = styled.div`
  box-sizing: border-box;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 97px;
  height: 25px;
  background: ${props => props.active ? '#E1FCEF' : '#FFD9E1'};
  border: 1px solid ${props => props.active ? '#14BA6D' : '#DD1924'};
  border-radius: 12px;
`;

const StatusIndicator = ({ active }) => {
  return (
    <StyledStatusIndicator active={active}>
      {active ? 'Active' : 'Closed'}
    </StyledStatusIndicator>
  );
};

export default StatusIndicator;
