import styled from "styled-components";

export const ButtonSmall = styled.button<{
  bgcolor?: string;
}>`
  font-size: 12px;
  outline: none;
  border-radius: 4px;
  border: none;
  padding: 4px 16px;
  background-color: ${(props) => props.bgcolor ?? 'none'};
  color: "#000";
  cursor: pointer;
`;
