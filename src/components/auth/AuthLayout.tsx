import styled from "styled-components";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SWrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Container>
      <SWrapper>{children}</SWrapper>
    </Container>
  );
};

export default AuthLayout;
