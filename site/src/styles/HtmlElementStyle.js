import styled from "styled-components";

export const SfButton = styled.button`
  margin: 0;
  padding: 0;
  border-radius: 8px;
  width: 280px;
  height: 90px;
  font-weight: 600;
  font-size: 24px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  color: #000000;
  background-color: #ffffff;
  cursor: pointer;
  box-sizing: border-box;
  :hover {
    border: 4px solid rgba(0, 0, 0, 0.4);
  }
  :focus {
    border: 4px solid rgba(0, 0, 0, 0.4);
  }
  :disabled {
    color: rgba(0, 0, 0, 0.5);
    border: 4px solid rgba(0, 0, 0, 0.1);
  }
`;

export const SfH1 = styled.h1`
  font-style: normal;
  font-weight: 300;
  font-size: 48px;
`;

export const SfH2 = styled.h2`
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
`;

export const SfP = styled.p`
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
`;

export const SfTextInput = styled.input`
  width: 400px;
  height: 32px;
  padding: 16px;
  background: #ffffff;
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 30px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  ::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }
`;
