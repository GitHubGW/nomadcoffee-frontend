import styled from "styled-components";

interface FormErrorProps {
  message?: string;
}

const Container = styled.h1`
  color: tomato;
  font-weight: bold;
  font-size: 12px;
  margin-top: 10px;
`;

const FormError = ({ message }: FormErrorProps) => {
  return <Container>{message}</Container>;
};

export default FormError;
