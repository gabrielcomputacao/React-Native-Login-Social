import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  width: 100%;
  padding: 20px 16px;

  flex-direction: row;
  justify-content: space-between;

  align-items: center;
  border-radius: 6px;
  margin-bottom: 12px;
`;

export const Info = styled.View`
  flex: 1;
`;

export const LicensePlate = styled.Text`
  color: ${(props) => props.theme.COLORS.WHITE};
  font-size: ${(props) => props.theme.FONT_SIZE.MD}px;
  font-family: ${(props) => props.theme.FONT_FAMILY.BOLD};
`;
export const Departure = styled.Text`
  color: ${(props) => props.theme.COLORS.GRAY_200};
  font-size: ${(props) => props.theme.FONT_SIZE.XS}px;
  font-family: ${(props) => props.theme.FONT_FAMILY.REGULAR};

  margin-top: 4px;
`;
