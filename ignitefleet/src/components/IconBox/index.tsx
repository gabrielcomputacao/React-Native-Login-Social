import { IconProps } from "phosphor-react-native";
import { Container, SizeProps } from "./styles";
import theme from "../../theme";

export type IconBoxProps = (props: IconProps) => JSX.Element;

type Props = {
  size?: SizeProps;
  icon: IconBoxProps;
};

export function IconBox({ size = "NORMAL", icon: Icon }: Props) {
  const iconSize = size === "NORMAL" ? 24 : 16;

  return (
    <Container size={size}>
      <Icon size={iconSize} color={theme.COLORS.BRAND_LIGHT} />
    </Container>
  );
}
