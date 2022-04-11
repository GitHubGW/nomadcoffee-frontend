import styled from "styled-components";

export const SBaseBox = styled.div`
  background-color: white;
  border: 1px solid lightgray;
  width: 100%;
`;

export const SAuthButton = styled.button`
  border: none;
  margin-top: 12px;
  background-color: ${(props) => props.theme.mainColor};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.2" : "1")};
`;

export const SInput = styled.input`
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  background-color: #fafafa;
  border: 0.5px solid lightgray;
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
`;
