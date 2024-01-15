import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
`;

export const Arrival = styled.View``;

export const Line = styled.View`
  height: 64px;
  width: 1px;
  margin: -2px;
  margin-left: 23px;
  border-width: 1px;

  background-color: ${(props) => props.theme.COLORS.GRAY_100};
`;
