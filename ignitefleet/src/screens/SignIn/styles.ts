import styled from "styled-components/native";

export const Container = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  padding: 52px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.COLORS.GRAY_800};
  font-size: ${(props) => props.theme.FONT_SIZE.XXXL}px;
  font-family: ${(props) => props.theme.FONT_FAMILY.BOLD};
  text-align: center;
`;
export const Slogan = styled.Text`
  color: ${(props) => props.theme.COLORS.GRAY_100};
  font-size: ${(props) => props.theme.FONT_SIZE.MD}px;
  font-family: ${(props) => props.theme.FONT_FAMILY.REGULAR};
  text-align: center;

  margin-bottom: 32px;
`;
