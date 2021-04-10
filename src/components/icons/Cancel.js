import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgCancel(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3C3A36"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      className=""
      {...props}>
      <Path d="M18 6L6 18M6 6l12 12" />
    </Svg>
  );
}

export default SvgCancel;
