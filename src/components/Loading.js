import styled from "styled-components";
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";

const override = css`
margin: 0 auto;
color: #FF4791;
`;
export default function Loading() {
    return (
        <StyledLoading>
            <PulseLoader loading color="#FF4791" css={override} size={50} />
        </StyledLoading>
    );
};

const StyledLoading = styled.div`
    width: 100%;
    height: 100vh;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
`


