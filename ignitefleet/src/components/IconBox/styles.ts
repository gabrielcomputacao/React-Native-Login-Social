import styled, { css } from "styled-components/native";

export type SizeProps = "SMALL" | "NORMAL";

type Props = {
  size: SizeProps;
};

const variantSizeStyles = (size: SizeProps) => {
  return {
    SMALL: css`
      width: 32px;
      height: 32px;
    `,
    NORMAL: css`
      width: 36px;
      height: 36px;
    `,
  }[size];
};

export const Container = styled.View<Props>`
  flex: 1;
  border-radius: 6px;
  background-color: ${(props) => props.theme.COLORS.GRAY_700};
  justify-content: center;
  align-items: center;
  margin-right: 12px;

  ${({ size }) => variantSizeStyles(size)}
`;
