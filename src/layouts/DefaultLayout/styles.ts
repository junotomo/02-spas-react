import styled from "styled-components";

export const LayoutContainer = styled.div`
    max-width: 90rem;
    margin: 0 auto;
    padding: 2.5rem;

    background: ${props => props.theme['gray-800']};

    display: flex;
    flex-direction: column;
`;