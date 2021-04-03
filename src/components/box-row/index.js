import styled from 'styled-components';
import Box from '../box';
const BoxRow = styled(Box)({});

BoxRow.defaultProps = {
  alignItems: 'center',
  flexDirection: 'row',
};
export default BoxRow;
