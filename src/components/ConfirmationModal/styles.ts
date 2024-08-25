import styled from "styled-components";
import { Button } from "~/components/Buttons/ButtonPrimary/styles";
import { IconButton } from "~/components/IconButton/styles";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Content = styled.div`
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 24px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  bottom: 28px;
  right: -28px;

  ${IconButton} {
    border: none;
    svg {
      cursor: pointer;
      fill: #000;
    }
    z-index: 3;
    position: absolute;
    top: 0;
    right: 0;
    padding: 8px;
    display: block;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;

   ${IconButton} {
    border: none;
    svg {
      cursor: pointer;
      fill: #000;
    }
          z-index: 3;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    padding: 8px;
    display: block;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

export const Subtitle = styled.div`
  margin-top: 8px;
  font-size: 16px;
  font-weight: normal;
`;

export const Actions = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: flex-end;
  gap: 4px;
`;

export const AgreeAction = styled.div`
  ${Button} {
    height: 40px;
    padding: 8px 16px;
    opacity: 0.90;
    background-color: #3d994df7;

    &:hover {
      opacity: 1.0;
    } 
  }
`;

export const DisagreeAction = styled.div`
  ${Button} {
    height: 40px;
    padding: 8px 16px;
    background-color: #f04032;
    opacity: 0.90;

    &:hover {
      opacity: 1.0;
    } 
  }
`;
