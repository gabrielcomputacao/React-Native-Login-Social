import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  flex: 1;
  /* com essa estrategia usando flex mais esses max e min ele somente vai crescer na horizontal */
  min-height: 56px;
  max-height: 56px;

  border-radius: 6px;

  align-items: center;
  justify-content: center;

  background-color: ${(props) => props.theme.COLORS.BRAND_MID};
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.COLORS.WHITE};
  font-size: ${(props) => props.theme.FONT_SIZE.MD}px;
  font-family: ${(props) => props.theme.FONT_FAMILY.BOLD};
  text-align: center;
`;

export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.WHITE,
}))``;
