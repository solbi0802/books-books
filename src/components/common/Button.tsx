import { Button } from "antd";
import React from "react";
import styled from "styled-components";

interface buttonProps {
  title: string;
  size?: "large" | "middle" | "small";
  shape?: "default" | "circle" | "round";
  type: "primary" | "default" | "ghost" | "dashed" | "text" | "link";
  onClick: (event: React.MouseEvent) => void;
}

const StyledDefaultButton = styled(Button)`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.textSubtitle};
  border-radius: 8px;
  font-size: ${(props) => props.theme.body2};
`;

const StyledPrimaryButton = styled(Button)`
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.white};
  border-radius: 8px;
  font-size: ${(props) => props.theme.caption};
  width: 115px;
  height: 48px;
`;

const CommonButton = (props: buttonProps) => {
  const { title, type, shape, size, onClick } = props;
  return type === "default" ? (
    <StyledDefaultButton
      size={size}
      shape={shape}
      type="default"
      onClick={onClick}
    >
      {title}
    </StyledDefaultButton>
  ) : (
    <StyledPrimaryButton
      size={size}
      shape={shape}
      type="primary"
      onClick={onClick}
    >
      {title}
    </StyledPrimaryButton>
  );
};

export default CommonButton;
