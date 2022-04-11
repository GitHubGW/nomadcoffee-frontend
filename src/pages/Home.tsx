import styled from "styled-components";
import Header from "../components/Header";
import { handleLogout, isDarkModeVar } from "../apollo";

const Container = styled.div`
  height: 100vh;
`;

const Home = () => {
  return (
    <Container>
      <Header />
      <button onClick={handleLogout}>Logout!</button>
      <button onClick={() => isDarkModeVar(false)}>Light</button>
      <button onClick={() => isDarkModeVar(true)}>Dark</button>
    </Container>
  );
};

export default Home;
