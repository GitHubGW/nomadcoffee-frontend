import styled from "styled-components";
import { SBaseBox } from "../../common/shared";

interface FormBoxProps {
  children: React.ReactNode;
}

const Container = styled(SBaseBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 25px 40px;
  margin-bottom: 10px;

  form {
    margin-top: 35px;
    width: 100%;
    display: flex;
    justify-items: center;
    flex-direction: column;
    align-items: center;
  }
`;

const FormBox = ({ children }: FormBoxProps) => {
  return <Container>{children}</Container>;
};

export default FormBox;
