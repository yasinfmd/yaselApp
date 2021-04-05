import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgCheck(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3C3A36"
      strokeLinecap="round"
      strokeLinejoin="round"
      className=""
      {...props}>
      <Path d="M20 6L9 17l-5-5" />
    </Svg>
  );
}

export default SvgCheck;
