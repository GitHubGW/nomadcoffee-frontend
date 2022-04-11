import styled from "styled-components";
import { Link } from "react-router-dom";
import { SBaseBox } from "../../common/shared";

interface BottomBoxProps {
  cta: string;
  link: string;
  linkText: string;
}

const Container = styled(SBaseBox)`
  padding: 20px 0px;
  text-align: center;

  a {
    font-weight: 600;
    color: ${(props) => props.theme.mainColor};
  }
`;

const BottomBox = ({ cta, link, linkText }: BottomBoxProps) => {
  return (
    <Container>
      <span>{cta}</span>
      <Link to={link}>{linkText}</Link>
    </Container>
  );
};

export default BottomBox;
