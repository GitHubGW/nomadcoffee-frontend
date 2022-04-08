import styled from "styled-components";
import { isDarkModeVar } from "../apollo";
import Header from "../components/Header";
import { isLoggedInVar } from "../apollo";

const Container = styled.div`
  height: 100vh;
`;

const Home = () => {
  return (
    <Container>
      <Header />
      <button onClick={() => isLoggedInVar(false)}>Logout!</button>
      <button onClick={() => isDarkModeVar(false)}>Light</button>
      <button onClick={() => isDarkModeVar(true)}>Dark</button>
    </Container>
  );
};

export default Home;
