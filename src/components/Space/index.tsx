import styled from 'styled-components';

const Space = styled.div<{ size?: number }>`
  position: relative;
  width: 100%;
  height: ${({ size }) => size || 16}px;
`;

export default Space;
