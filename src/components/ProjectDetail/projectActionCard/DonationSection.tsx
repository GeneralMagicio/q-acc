import { IProject } from "@/apollo/types/types";
import useMediaQuery from "@/hooks/useMediaQuery";
import { device } from "@/lib/constants/constants";
import {
  B,
  Caption,
  Flex,
  H3,
  H4,
  mediaQueries,
  neutralColors,
  P,
  Subline,
} from "@giveth/ui-design-system";
import React, { FC } from "react";
import styled from "styled-components";

interface IDonateSectionProps {
  projectData?: IProject;
}
export const DonateSection: FC<IDonateSectionProps> = ({ projectData }) => {
  // const { formatMessage, locale } = useIntl();
  const { totalDonations } = projectData || {};
  // const totalDonations = 0;
  const isMobile = !useMediaQuery(device.tablet);

  return (
    <DonationSectionWrapper>
      {totalDonations && totalDonations !== 0 ? (
        <DonateInfo>
          {isMobile && <br />}
          <Title>
            {/* {formatMessage({ id: 'label.total_amount_raised' })} */}
            Total Amout Raised in this round
          </Title>
          <Amount weight={700}>
            {/* {formatDonation(totalDonations || 0, '$', locale)} */}
            {totalDonations}
          </Amount>
          <Description>
            {/* {formatMessage({
    					id: 'label.raised_from',
    				})} */}
            Raised From
            <Caption $medium>{projectData?.countUniqueDonors}</Caption>
            {/* {formatMessage(
    					{
    						id: 'label.contributors',
    					},
    					{
    						count: projectData?.countUniqueDonors,
    					},
    				)} */}
            Contributers
          </Description>
        </DonateInfo>
      ) : (
        <DonateInfo>
          <NoFund weight={700}>
            {/* {formatMessage({
    					id: 'label.donate_first_lead_the_way',
    				})} */}
            Donate first!
          </NoFund>
        </DonateInfo>
      )}
      <div>
        <span className="text-[#2EA096] p-1 rounded-lg bg-[#D2FFFB] text-xs ">
          You are on early access list
        </span>
      </div>

      <div>
        <p className="text-[#A5ADBF]">This mint round closes in</p>
        <p className="font-bold">7 days, 8 hour, 32 min</p>
      </div>

      <div className="flex justify-between">
        <p className="text-[#A5ADBF]">Mint rounds remaining</p>
        <span>5</span>
      </div>
    </DonationSectionWrapper>
  );
};
const Title = styled(Subline)`
  display: inline-block;
  color: ${neutralColors.gray[700]};
  background-color: ${neutralColors.gray[200]};
  border-radius: 4px;
  padding: 2px 4px;
`;

const Amount = styled(H3)``;

const Description = styled(Caption)`
  color: ${neutralColors.gray[700]};
  & > div {
    color: ${neutralColors.gray[900]};
    display: inline;
  }
`;

const DonationSectionWrapper = styled(Flex)`
  justify-content: space-between;
  flex-direction: column;
  ${mediaQueries.tablet} {
    flex-direction: row;
  }
  ${mediaQueries.laptopS} {
    flex-direction: column;
  }
`;

const DonateInfo = styled.div`
  margin-bottom: 20px;
`;

const NoFund = styled(H4)`
  color: ${neutralColors.gray[800]};
  margin-top: 16px;
`;

const DonateDescription = styled(Flex)`
  padding: 8px 16px;
  border: 1px solid ${neutralColors.gray[300]};
  border-radius: 16px;
`;
