import styled from 'styled-components'
import { size, color, flexbox, space, borderRadius, border, width, height, position, zIndex } from 'styled-system'
import { TouchableOpacity } from 'react-native';


const Button = styled(TouchableOpacity)(size, color, flexbox, space, borderRadius, border, width, height, position, zIndex);

export default Button;