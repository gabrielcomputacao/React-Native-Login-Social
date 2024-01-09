import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  border-radius: 6px;
  padding: 16px;

  background-color: ${(props) => props.theme.COLORS.GRAY_700};
`;

export const Label = styled.Text`
  color: ${(props) => props.theme.COLORS.GRAY_300};
  font-size: ${(props) => props.theme.FONT_SIZE.SM}px;
  font-family: ${(props) => props.theme.FONT_FAMILY.REGULAR};
`;
export const Input = styled.TextInput`
  color: ${(props) => props.theme.COLORS.GRAY_200};
  font-size: ${(props) => props.theme.FONT_SIZE.XXXL}px;
  font-family: ${(props) => props.theme.FONT_FAMILY.BOLD};

  text-align: center;
  margin-top: 16px;
`;
