import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tokensearchbar from "../explorer/tokensearchBar";
import FooterComponent from "../common/footerComponent";
import Table from "@material-ui/core/Table";
import { Grid, TableContainer } from "@material-ui/core";
import styled from "styled-components";
const Explorer = styled.div`
  color: #2149b9;
`;
const Heading = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;
const Subheading = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-top: 1rem;
`;
const PointHeading = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-top: 1rem;
`;
const Para = styled.div`
  font-size: 0.8rem;
  margin-top: 1.5rem;
`;
const Point = styled.div`
  font-size: 0.8rem;
`;
const PointContainer = styled.div`
  margin-top: 1rem;
`;

const Spacing = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
  height: auto;
  align-items: center;
  padding: 0.938rem 0.938rem;

  @media (min-width: 300px) and (max-width: 767px) {
    display: block;
  }
`;
const Div = styled.div`
  width: 900px;
  height: 100%;
  border-radius: 0.75rem;
  box-shadow: 0 0.125rem 0.938rem 0 rgba(0, 0, 0, 0.1);
  border: solid 0.063rem #e3e7eb;
  background-color: #fff;
  padding: 2rem;
  margin: 8rem auto 2rem auto;
  @media (min-width: 300px) and (max-width: 767px) {
    width: 22.563rem;
    margin-top: 0rem;
  }
`;

function TermsCondition() {
  const useStyles = makeStyles({});
  return (
    <div>
      <Tokensearchbar />
      <Div>
        <div>
          <Heading>Terms and Conditions</Heading>
          <Subheading>
            Please read our privacy policies very carefully.
          </Subheading>
          <Para>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation
          </Para>
          <PointHeading>1. Types of data we collect</PointHeading>
          <Para style={{ marginTop: "1rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip
          </Para>
          <PointContainer>
            <Point>
              a) Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat
            </Point>
            <Point>
              b) Excepteur sint occaecat cupidatat non proident, sunt in culpa
              qui officia deserunt mollit anim id est laborum
            </Point>
            <Point>
              c) Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam
            </Point>
          </PointContainer>
          <Para>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation
          </Para>
          <PointHeading style={{ marginTop: "2rem" }}>
            2. How do we collect personal data?
          </PointHeading>
          <Para style={{ marginTop: "1rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip
          </Para>
          <PointContainer>
            <Point>
              a) Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat
            </Point>
            <Point>
              b) Excepteur sint occaecat cupidatat non proident, sunt in culpa
              qui officia deserunt mollit anim id est laborum
            </Point>
            <Point>
              c) Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam
            </Point>
          </PointContainer>
          <Para style={{ marginTop: "1rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </Para>
          <PointContainer>
            <Point>
              a) Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat
            </Point>
            <Point>
              b) Excepteur sint occaecat cupidatat non proident, sunt in culpa
              qui officia deserunt mollit anim id est laborum
            </Point>
            <Point>
              c) Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam
            </Point>
          </PointContainer>
          <PointHeading style={{ marginTop: "2rem" }}>
            3. How do we collect personal data on our website?
          </PointHeading>
          <Para style={{ marginTop: "1rem" }}>
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </Para>
          <PointHeading style={{ marginTop: "1rem" }}>
            (a) Lorem ipsum
          </PointHeading>
          <Point>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum
          </Point>
          <PointHeading style={{ marginTop: "1rem" }}>
            (b) sed Culpa
          </PointHeading>
          <Point>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum
          </Point>
          <Para style={{ marginTop: "1rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua quae ab
            illo inventore veritatis et quasi architecto beatae vitae dicta sunt
            explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur
            aut odit aut fugit, sed quia consequuntur magni dolores eos qui
          </Para>
          <Para style={{ marginTop: "1rem" }}>
            ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
            dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui
          </Para>
          <PointHeading style={{ marginTop: "1rem" }}>
            (c) Dolorem ipsum
          </PointHeading>
          <Point>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum
          </Point>
          <PointHeading style={{ marginTop: "2rem" }}>
            4. What do we use your personal data for?
          </PointHeading>
          <Para style={{ marginTop: "1rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Para>
          <PointContainer>
            <Point>
              a) Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat
            </Point>
            <Point>
              b) Excepteur sint occaecat cupidatat non proident, sunt in culpa
              qui officia deserunt mollit anim id est laborum
            </Point>
            <Point>
              c) Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam
            </Point>
            <Point>
              d) Excepteur sint occaecat cupidatat non proident, sunt in culpa
              qui officia deserunt mollit anim id est laborum
            </Point>
            <Point>
              e) Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam
            </Point>
          </PointContainer>
          <PointHeading style={{ marginTop: "2rem" }}>
            5. Accessing / Correcting / Updating our personal data
          </PointHeading>
          <Para style={{ marginTop: "1rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. quae ab
            illo inventore veritatis et quasi architecto beatae vitae dicta sunt
            explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur
            aut odit aut fugit, sed quia consequuntur magni dolores eos qui
            ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
            dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
            quia non numquam eius modi tempora incidunt ut labore et dolore
          </Para>
          <Para style={{ marginTop: "1rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. quae ab
            illo inventore veritatis et quasi architecto beatae vitae dicta sunt
          </Para>
          <PointHeading style={{ marginTop: "2rem" }}>
            6. Withdrawning consent
          </PointHeading>
          <Para style={{ marginTop: "1rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. quae ab
            illo inventore veritatis et quasi architecto beatae vitae dicta sunt
          </Para>
          <Para style={{ marginTop: "1rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. quae ab
            illo inventore veritatis et quasi architecto beatae vitae dicta sunt
          </Para>
          <PointContainer>
            <Point>
              a) Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat
            </Point>
            <Point>
              b) Excepteur sint occaecat cupidatat non proident, sunt in culpa
              qui officia deserunt mollit anim id est laborum
            </Point>
            <Point>
              c) Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam
            </Point>
          </PointContainer>
          <PointHeading style={{ marginTop: "2rem" }}>
            7. To whom do we discolose your personal data?
          </PointHeading>
          <Para style={{ marginTop: "1rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. quae ab
            illo inventore veritatis et quasi architecto beatae vitae dicta sunt
          </Para>
          <PointContainer>
            <Point>
              a) Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat
            </Point>
            <Point>
              b) Excepteur sint occaecat cupidatat non proident, sunt in culpa
              qui officia deserunt mollit anim id est laborum
            </Point>
            <Point>
              c) Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam
            </Point>
          </PointContainer>
          <PointHeading style={{ marginTop: "2rem" }}>
            8. How long will we retain your personal data?
          </PointHeading>
          <Para style={{ marginTop: "1rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. quae ab
            illo inventore veritatis et quasi architecto beatae vitae dicta sunt
          </Para>
          <PointHeading style={{ marginTop: "2rem" }}>
            9. Links to third party websites
          </PointHeading>
          <Para style={{ marginTop: "1rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. quae ab
            illo inventore veritatis et quasi architecto beatae vitae dicta sunt
          </Para>
          <Para style={{ marginTop: "1rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. quae ab
            illo inventore veritatis et quasi architecto beatae vitae dicta sunt
          </Para>
          <PointHeading style={{ marginTop: "2rem" }}>
            10. Additional Information or assistance
          </PointHeading>
          <Para style={{ marginTop: "1rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. quae ab
            illo inventore veritatis et quasi architecto beatae vitae dicta sunt <span style= {{color:"#2149b9",fontWeight:"bold"}}>Contact Us</span>
          </Para>
          
          
        </div>
      </Div>

      <FooterComponent />
    </div>
  );
}

export default TermsCondition;
