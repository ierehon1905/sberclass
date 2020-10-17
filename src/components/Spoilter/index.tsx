import React, { useState } from "react";
import styled from "styled-components";
import { GoToTrigger, LessonPage } from "../../containers/Flow";
import { PageButtonWithAnchor } from "../PageButton";
import pageSrc from "../HierarchyItem/Page.svg";

const StyledHeader = styled.div`
  border: 2px solid ${p => p.theme.white};
  background-color: ${p => p.theme.white};
  box-shadow: 2px -2px 30px #eee;
`;

const StyledContainer = styled.div`
    padding-vertical: 12px;
    padding-vertical: 20px;
`;

export type Props = {
    // onPageEdit: () => void;
    title: string,
    children: any,
    expanded?: boolean,
};

export const Spoiler = ({ title, expanded, children }: Props) => {
    const [visible, setVisible] = useState(expanded);

    return (
        <>
            <StyledHeader onClick={() => setVisible(!visible)} >
                {title}
            </StyledHeader>
            <StyledContainer>
                {visible &&
                    children
                }
            </StyledContainer>
        </>
    );
};
