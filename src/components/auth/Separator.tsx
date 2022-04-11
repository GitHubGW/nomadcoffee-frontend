import styled from "styled-components";

const Container = styled.div`
  margin: 20px 0px 30px 0px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;

  div {
    width: 100%;
    height: 1px;
    background-color: lightgray;
  }
  span {
    margin: 0px 10px;
    font-weight: 600;
    color: #8e8e8e;
  }
`;

const Separator = () => {
  return (
    <Container>
      <div></div>
      <span>Or</span>
      <div></div>
    </Container>
  );
};

export default Separator;
