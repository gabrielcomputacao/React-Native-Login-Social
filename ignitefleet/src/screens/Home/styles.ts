import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.COLORS.GRAY_800};
`;
export const Content = styled.View`
  flex: 1;
  padding: 32px;
`;

export const Label = styled.Text`
  color: ${(props) => props.theme.COLORS.GRAY_400};
  font-size: ${(props) => props.theme.FONT_SIZE.MD}px;
  font-family: ${(props) => props.theme.FONT_FAMILY.REGULAR};

  margin-top: 32px;
  text-align: center;
`;
export const Tittle = styled.Text`
  color: ${(props) => props.theme.COLORS.WHITE};
  font-size: ${(props) => props.theme.FONT_SIZE.MD}px;
  font-family: ${(props) => props.theme.FONT_FAMILY.REGULAR};

  margin-bottom: 12px;
`;
