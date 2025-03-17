import styled from "styled-components";
import { LogoutOutlined } from "@ant-design/icons";

export const HeaderContainer = styled.header`
    height: 150px;
    width: 100%;
    display: flex;
    align-items: top;
    justify-content: flex-end;
    background-color: #0d1116;
`;
export const LogoExit = styled(LogoutOutlined)`
    font-size: 24px;
`;  