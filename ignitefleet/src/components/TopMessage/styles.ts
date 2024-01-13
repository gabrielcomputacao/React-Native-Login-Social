import { Dimensions } from "react-native";
import styled from "styled-components/native";

/* pega as dimensoes da janela que está sendo aberta,
    width nesse caso vai ser variado
*/
const dimensions = Dimensions.get("window");

export const Container = styled.View`
  width: ${dimensions.width}px;

  position: absolute;
  z-index: 2;

  background-color: ${(props) => props.theme.COLORS.GRAY_500};
  padding-bottom: 5px;
  flex-direction: row;

  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.COLORS.GRAY_100};
  font-size: ${(props) => props.theme.FONT_SIZE.LG}px;
  font-family: ${(props) => props.theme.FONT_FAMILY.BOLD};

  margin-left: 4px;
`;
