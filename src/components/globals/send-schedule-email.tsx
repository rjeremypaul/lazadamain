import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  render,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface SendScheduleEmailProps {
  name: string;
  interviewDate: string;
  accountNumber: string;
}

export const SendScheduleEmail = ({
  accountNumber,
  name,
  interviewDate,
}: SendScheduleEmailProps) => (
  <Html>
    <Head />
    <Preview>Your interview schedule for Lazada Expedise</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={
            "https://firebasestorage.googleapis.com/v0/b/tander-mobile.appspot.com/o/logo.png?alt=media&token=74caa822-94df-45e3-b655-82abfa403750"
          }
          width="42"
          height="42"
          alt="Linear"
          style={logo}
        />
        <Heading style={heading}>
          Your interview schedule for Lazada Expedise
        </Heading>
        <Text style={paragraph}>
          Please bring this information with you when you visit the office for
          your interview.
        </Text>
        <Text>Applicant Name: {name}</Text>
        <Text>Interview Date: {interviewDate}</Text>
        <Text>Location: Lazada Logistics Office, 123 Business Road</Text>
        <Text>Account Number: {accountNumber}</Text>
        <Section style={notice}>
          <Text style={paragraph}>
            Important: After completing your interview, you will proceed to
            practical training inside the warehouse. Once you successfully
            complete the training, you will have digital interview, and your
            performance will be evaluated by the HR Admin.
          </Text>
        </Section>
        <Text style={paragraph}>
          If you have any questions or need help, please contact us at{" "}
          <Link href="mailto:admin12345@gmail.com" style={code}>
            admin12345@gmail.com
          </Link>
        </Text>
        <Hr style={hr} />
        <Link
          href="https://lazadaexpedise.agency"
          style={reportLink}
        >
          Lazada Expedise Agency PH
        </Link>
      </Container>
    </Body>
  </Html>
);

export const SendScheduleEmailHTML = (props: SendScheduleEmailProps) =>
  render(<SendScheduleEmail {...props} />, {
    pretty: true,
  });

const logo = {
  borderRadius: 21,
  width: 42,
  height: 42,
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const notice = {
  backgroundColor: "#ffebcc",
  borderRadius: "4px",
  padding: "16px",
  margin: "20px 0",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
};

const paragraph = {
  margin: "0 0 15px",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const buttonContainer = {
  padding: "27px 0 27px",
};

const button = {
  backgroundColor: "#d15400",
  borderRadius: "3px",
  fontWeight: "600",
  color: "#fff",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "11px 23px",
};

const reportLink = {
  fontSize: "14px",
  color: "#b4becc",
};

const hr = {
  borderColor: "#dfe1e4",
  margin: "42px 0 26px",
};

const code = {
  fontFamily: "monospace",
  fontWeight: "700",
  padding: "1px 4px",
  backgroundColor: "#dfe1e4",
  letterSpacing: "-0.3px",
  fontSize: "21px",
  borderRadius: "4px",
  color: "#3c4149",
};
