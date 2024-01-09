import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  width: 100%;
  margin: 32px 0;
  padding: 22px;
  border-radius: 6px;

  background-color: ${(props) => props.theme.COLORS.GRAY_700};

  flex-direction: row;
  align-items: center;
`;

export const IconBox = styled.View`
  width: 77px;
  height: 77px;
  border-radius: 6px;

  background-color: ${(props) => props.theme.COLORS.GRAY_600};

  margin: 12px;
  justify-content: center;
  align-items: center;
`;

export const Message = styled.Text`
  color: ${(props) => props.theme.COLORS.GRAY_100};
  font-size: ${(props) => props.theme.FONT_SIZE.LG}px;
  font-family: ${(props) => props.theme.FONT_FAMILY.REGULAR};

  flex: 1;
  text-align: justify;
  /* estilização do proprio react native para ajustar o texto, colocando com styled component tambem da certo */
  textalignvertical: center;
`;
export const TextHighligh = styled.Text`
  color: ${(props) => props.theme.COLORS.BRAND_LIGHT};
  font-size: ${(props) => props.theme.FONT_SIZE.SM}px;
  font-family: ${(props) => props.theme.FONT_FAMILY.BOLD};
`;
