import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

function SvgVideo(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke="#000"
      strokeOpacity={0.53}
      fill="none"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      className=""
      {...props}>
      <Path d="M23 7l-7 5 7 5V7z" />
      <Rect x={1} y={5} width={15} height={14} rx={2} ry={2} />
    </Svg>
  );
}

export default SvgVideo;
