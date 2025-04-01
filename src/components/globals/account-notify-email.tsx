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

interface LazadaLoginCodeEmailProps {
  accountNumber: string;
  password: string;
  name: string;
  accountNotice: string;
}

export const LazadaLoginCodeEmail = ({
  accountNumber,
  password,
  name,
  accountNotice,
}: LazadaLoginCodeEmailProps) => (
  <Html>
    <Head />
    <Preview>Your login code for Lazada Expedise</Preview>
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
        <Heading style={heading}>Your account for Lazada Expedise</Heading>
        <Text style={paragraph}>Dear {name},</Text>
        <Text style={paragraph}>
          You can use the following link to login to your account on Lazada
          Expedise:
        </Text>
        <Text>Account Number: {accountNumber}</Text>
        <Text>Password: {password}</Text>
        <Section style={buttonContainer}>
          <Button
            style={button}
            href="https://lazadaexpedise.agency/login"
          >
            Login to Lazada Expedise
          </Button>
        </Section>
        <Text style={paragraph}>{accountNotice}</Text>
        <Text style={paragraph}>Please change your password after you successfully logged in.</Text>
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

export const LazadaLoginCodeEmailHTML = (props: LazadaLoginCodeEmailProps) =>
  render(<LazadaLoginCodeEmail {...props} />, {
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
