import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tokensearchbar from "../explorer/tokensearchBar";
import FooterComponent from "../common/footerComponent";
import styled from "styled-components";
// const Explorer = styled.div`
//   color: #2149b9;
// `;
const Heading = styled.div`
  width: 355px;
  height: 29px;
  margin: 0 789px 16px 0;
  font-family: Inter;
  font-size: 24px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  text-align: left;
  color: #2a2a2a;
  @media (min-width:0px) and (max-width:767px) {
    font-size:18px;
  };
`;
const Subheading = styled.div`
  width: 350px;
  height: 21px;
  margin: 16px 794px 32px 0;
  font-family: Inter;
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  text-align: left;
  color: #2a2a2a;
  @media (min-width:0px) and (max-width:767px) {
    font-size:15px;
  };
`;
const PointHeading = styled.div`
  font-weight: 600;
  margin: 32px 0 0 1px;
  font-family: Inter;
  font-size: 15px;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  text-align: left;
  color: #252525;
  @media (min-width:0px) and (max-width:767px) {
    margin-top:14px;
  };
`;
const Para = styled.div`
  margin: 32px 0 0 1px;
  font-family: Inter;
  font-size: 15px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  text-align: left;
  color: #252525;
`;
const Para1 = styled.div`
  width: 1136px;
  margin: 32px 7px 32px 1px;
  font-family: Inter;
  font-size: 15px;
  line-height: 1.27;
  
  text-align: left;
  color: #252525;
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
    overflow-x: scroll;
  };
  @media (min-width:0px) and (max-width:767px) {
    max-width: 360px;
    width: 100%;
    overflow-x: scroll;
    padding:5px 5px 5px 10px;
  };
`;

const Div = styled.div`
  width: 1202px;
  height: auto;
  margin: 55.5px auto 134px auto;
  padding: 32px 32px 80px 26px;
  border-radius: 12px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px #e3e7eb;
  background-color: var(--white-two);
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 740px;
    width: 100%;
    overflow-x: hidden;
  };
  @media (min-width:0px) and (max-width:767px) {
    max-width: 360px;
    width: 100%;
    overflow-x: hidden;
  };
`;
const BlockNumber = styled.div`
  width: 1143px;
  height: auto;
  margin: 32px 0 0 1px;
  font-family: Inter;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  
  text-align: left;
  color: #252525;
  @media (min-width:768px) and (max-width:1240px) {
    max-width: 720px;
    width: 100%;
    
  };
  @media (min-width:0px) and (max-width:767px) {
    width: 300px;
    margin-top:35px;
    padding:5px 5px 5px 10px;
    
  };
`;

const useStyles = makeStyles((theme) => ({
  textStyle1: {
    fontWeight: "600",
    color: "red",
  },

  textStyle2: {
    color: "#2149b9",
  },

  textStyle3: {
    fontWeight: 500,
  },

}));

export default function TermsCondition() {

  const classes = useStyles();
  return (
    <div>
      <Tokensearchbar />
      <Div>
        <div>
          <Heading>Terms of Use</Heading>
          <Subheading>Information Published on the Website</Subheading>
          <Para1>
            This website at{" "}
            <a href="" style={{ color: "#2149b9" }}>
              https://observer.xdc.org/{" "}
            </a>
            (hereinafter referred to as the “Website”) is published and
            maintained to provide information and material related to the XDC
            Network and associated XDC coin. Additional information may be
            provided regarding third-party dApps, smart contracts, and tokens
            (collectively, “Third-Party dApps”). You are not authorized to, nor
            should you, rely on the Website for legal advice, business advice,
            investment advice, technical advice, or advice of any kind
            whatsoever. You should not place any reliance on the information
            provided on the Website; you alone bear the full risk of any action
            taken or refrained from with regard to anything described on the
            Website or set forth in its contents.
          </Para1>
          <BlockNumber className={classes.BlockNumber}>
            <PointHeading>Privacy Policy </PointHeading>
            <Para>
              In addition to the terms set forth here, the site owner has
              established a privacy policy which describes the use of your data
              within the Website and explains certain rights you may have as a
              user. You can access the privacy policy at{" "}
              <a href="" style={{ color: "#2149b9" }}>
                https://observer.xdc.org/privacy-policy{" "}
              </a>
            </Para>
            <PointHeading>User-Defined Content </PointHeading>
            <Para>
              Efforts have been made to program the Website with functionality
              which allows you to customize the content of the Website in ways
              that may render the information more readable, more relevant, and
              more useful to you. Information you read on the Website may have
              been provided by us, by you, or by any other third party who may
              have discovered, or to whom you may have disclosed, your account
              credentials. For that reason, we do not make any assurances
              regarding the content of the Website or the accuracy of that
              content
            </Para>
            <Para>
              All information on the Website is secondary source material,
              having been gathered at some point in the past and by some means
              from other, primary sources. If you are attempting to verify a
              particular fact relative to information you find on the Website,
              you should seek and consult those other, primary sources. Even
              where no customized information has been entered under your
              account credentials, you may not assume the facts, data, and
              information displayed on the Website are accurate.
            </Para>
            <Para>
              No reliance should be placed on any fact, data, or information you
              obtain from the Website in support of your decision to buy, sell,
              trade, exchange, hold (or hodl), give, accept, endorse, or
              criticize any cryptocurrency, including XDC coin and other tokens
              on the XDC Network, or any other thing or idea which you believe
              may have or lack value of any kind.
            </Para>
            <Para>
              This Website is a tool. As with every other tool built my
              humanity, this Website is well suited for very few applications
              and poorly suited for all others. Mastery of any craft or subject
              matter necessarily lies in the master, not in the tools he or she
              employs. Accordingly, you may not rely on this Website for any
              particular purpose but should instead consult qualified
              professional advisors prior to making any decision which could
              affect your legal, business, investment, or technical interests.
            </Para>
            <PointHeading>Risks related to use of XDC coins</PointHeading>
            <Para>
              XDC coins, powered by XDC Network’s XDPoS consensus protocol, are
              private instruments, are not registered with any regulatory agency
              of any jurisdiction, and are not subject to the same regulatory
              requirements as exchange traded funds or mutual funds which would
              be registered with appropriate regulatory authorities (e.g., the
              Monetary Authority of Singapore or the Securities and Exchange
              Commission in the United States). This is likely true of all
              tokens associated with Third-Party dApps as well. Because XDC
              coins are not registered instruments, any information on the
              Website or elsewhere purporting to relate to pricing and valuation
              may lack the standardization and reliability typical of investment
              instruments. XDC coins have not been reviewed or approved by
              federal, state or local regulators of any jurisdiction.
            </Para>
            <Para>You should carefully note the following:</Para>
            <Para>
              To the extent any person would purchase or receive XDC coins for
              investment purposes, such investment is purely speculative
              investment and involves a high degree of risk. Any investor can
              lose all or a considerable portion of his or her investment, but
              this is particularly true with an investment that is unregulated.
              The value of unregulated assets can drop to zero in less time than
              it takes to read these Terms of Use. Anyone planning to invest
              must have appropriate sophistication, experience, financial
              ability, and willingness to bear risks of an investment. No
              investment in XDC coins should be made in an amount greater than
              the maximum loss you are willing and able to bear.
            </Para>
            <Para>
              Fees and expenses associated with transfer of XDC coins (which may
              be considerable, regardless of any other factors) will offset any
              trading profits that might be realized through the purchase, sale,
              and exchange of XDC coins.
            </Para>
            <Para>
              In making statements on the Website, the site owner may rely on
              trading expertise and experience of third-party advisors, the
              identity of which may not be disclosed to the public, or may make
              such statements without any reliance on any expert, evidence, or
              authority whatsoever. The site owner may have conflicts of
              interest which affect the owner’s impartiality, beliefs,
              motivations, and understanding of any subject.
            </Para>
            <Para>
              These few risks described here are not a complete list of risks
              associated with reliance on the information set forth on the
              Website. Other disclosures, which would be deemed necessary in
              order to make a knowing and informed investment, may be available
              on other websites or from other sources; such sources ought to be
              carefully reviewed prior to purchasing, trading, exchanging,
              staking, or selling XDC coins or otherwise incurring any risk
              associated therewith.
            </Para>
            <PointHeading>Investment Risks </PointHeading>
            <Para>
              The price of XDC coins is highly volatile and you should expect
              prices to have wide-ranging fluctuations. Any investment in XDC
              can lead to loss of money over short or long periods.
              “Cryptocurrency” trading is not appropriate for all users of the
              Website and may not be appropriate for you. Anyone who is planning
              to invest in cryptocurrencies should consult a well-qualified,
              independent, and professional financial advisor. The information
              published on the Website is not a suitable replacement for such an
              advisor and cannot guarantee that a purchaser of XDC will not lose
              money.{" "}
            </Para>
            <PointHeading>No Investment Advice </PointHeading>
            <Para>
              The entire body of information given on the Website does not
              consist of or include investment advice, trading advice, financial
              advice, technical advice, or any other kind of advice. Under no
              circumstance should you take any of the Website’s content,
              including data, as advice or as information that is suitable to
              support an important decision. The site owner never recommends
              that you buy, sell or hold any XDC coins or participate or invest
              in Third-Party dApps. Nothing on the website should be considered
              as a proposal or recommendation that you buy, sell or hold any XDC
              coins. The closest things to advice we can offer you is to
              emphatically state that you should fully conduct your own due
              diligence and consult a qualified professional financial advisor
              before you make any investment decisions.{" "}
            </Para>
            <PointHeading>No warranties </PointHeading>
            <Para>
              The Website is provided on an “as is” basis without any warranties
              of any kind regarding the Website or any content, data, material,
              information, or services provided on the Website.
            </Para>
            <PointHeading>Limitation of liability </PointHeading>
            <Para>
              In no event shall the site owner be liable for any direct,
              indirect, special or consequential damages of any kind, including,
              but not limited to, loss of use, loss of profits, or loss of data
              arising out of or in any way connected with the use of the Website
              or XDC coins or of any Third-Party dApp.
            </Para>
            <PointHeading>Accuracy of Information </PointHeading>
            <Para>
              Given the rapidity with which blockchain is developing, the fact
              that change is the only constant in the cryptosphere, and the
              intentional efforts to allow and encourage participation by the
              community at large, the site owner makes no general or specific
              assurances of accuracy with respect to the Website or any
              information on it. The site owner holds no responsibility for any
              wrong, misleading, outdated, or missing information. By using the
              Website, you represent that you are utilizing any and all
              information present on the Website at your own risk.
            </Para>
            <PointHeading>Modifications to the site </PointHeading>
            <Para>
              The site owner reserves the right to change or modify the terms
              and conditions contained in these Terms of Use, any policy or
              guideline of the Website, and the content of the Website,
              including without limitation the very existence of the Website, at
              any time and in its sole discretion. The only notice of such
              changes will be by posting the revised terms, policy, guideline,
              or content to the Website. Any changes or modifications will be
              effective immediately upon posting the revisions to the Website
              and will apply to all subsequent use of the Website without regard
              to any corresponding change to these Terms of Use. Your continued
              use of the Website will confirm your acceptance of such changes or
              modifications; therefore, you should review the terms, applicable
              policies, and content whenever you use the Website to understand
              the terms that apply to such use.
            </Para>
            <PointHeading>Links to the other sites </PointHeading>
            <Para>
              The Website may contain links to other websites which are not
              managed by the owner of the Website. The features, content and
              accessibility of those sites are not controlled by the owner of
              the Website. The inclusion of any such links does not imply the
              approval or endorsement of the content included in the linked
              sites.
            </Para>
            <PointHeading>Website Downtime & Maintenance </PointHeading>
            <Para>
              At various and unpredictable times, the Website will be down for
              maintenance, updating, or for reasons not yet anticipated. The
              site owner is not liable to you for damages, difficulties, or
              inconvenience caused by the unavailability of the Website
              regardless of the cause of the unavailability.
            </Para>
          </BlockNumber>

        </div>

      </Div>


      <FooterComponent />
    </div>
  );
}


