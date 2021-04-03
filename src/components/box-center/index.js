import styled from 'styled-components';
import Box from '../box';
const BoxCenter = styled(Box)({});

BoxCenter.defaultProps = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
};
export default BoxCenter;
