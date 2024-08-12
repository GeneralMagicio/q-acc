import styled from "styled-components";
import { ProjectPublicActions } from "./ProjectPublicActions";

const MobileDonateFooter = () => {
  return (
    <MobileFooter>
      <ProjectPublicActions />
    </MobileFooter>
  );
};

const MobileFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: fixed;
  padding: 16px 24px;
  bottom: 0;
  left: 0;
  background-color: white;
  width: 100%;
  z-index: 10;
  box-shadow: 0 3px 20px rgba(212, 218, 238, 0.7);
`;

export default MobileDonateFooter;
