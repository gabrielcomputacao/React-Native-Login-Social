import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme from "../../theme";
import { IconBoxProps } from "../ButtonIcon";
import { Container, Title } from "./styles";

type Props = {
  icon?: IconBoxProps;
  title: string;
};

export function TopMessage({ title, icon: Icon }: Props) {
  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 5;

  return (
    <Container style={{ paddingTop }}>
      {Icon && <Icon size={18} color={theme.COLORS.GRAY_100} />}

      <Title>{title}</Title>
    </Container>
  );
}
