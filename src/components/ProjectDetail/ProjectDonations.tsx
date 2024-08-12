import { Caption, Col, mediaQueries, Row } from "@giveth/ui-design-system";
import React from "react";
import styled from "styled-components";

const ProjectDonations = () => {
  return (
    <>
      <StyledRow>
        <Col lg={4}>{/* <ProjectTotalFundCard  /> */}</Col>
        <Col lg={8}>{/* <ProjectDonationTable  /> */}</Col>
      </StyledRow>
    </>
  );
};

const StyledRow = styled(Row)`
  margin-bottom: 100px;
  ${mediaQueries.laptopL} {
    flex-direction: row-reverse;
    align-items: stretch !important;
  }
`;

const InfoCaption = styled(Caption)`
  margin: 5px 0 5px 0;
  font-style: italic;
`;
export default ProjectDonations;
