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

interface TrainingPassedEmailProps {
  name: string;
  trainingScore: string;
  trainingStatus: string;
  interviewScore: string;
  interviewStatus: string;
  overallScore: string;
  overallStatus: string;
}

export const TrainingPassedEmail = ({
  name,
  trainingScore,
  trainingStatus,
  interviewScore,
  interviewStatus,
  overallScore,
  overallStatus,
}: TrainingPassedEmailProps) => (
  <Html>
    <Head />
    <Preview>Practical Training and Digital Interview Evaluation</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img
            src={
              "https://firebasestorage.googleapis.com/v0/b/tander-mobile.appspot.com/o/logo.png?alt=media&token=74caa822-94df-45e3-b655-82abfa403750"
            }
            width="42"
            height="42"
            alt="Linear"
            style={logo}
          />
        </Section>
        <Heading style={{ ...heading, textAlign: "center" }}>
          Practical Training and Digital Interview Evaluation
        </Heading>
        <Text style={paragraph}>Applicant's Name: {name}</Text>
        <Text style={{ ...paragraph, color: "#008000" }}>Status: Accepted</Text>
        <Text className="text-green-600">Criteria Evaluation</Text>
        <Hr className="my-[16px] border-t-2 border-green-600" />
        <Section className="my-[16px] rounded-[8px] border border-solid border-gray-200 p-[16px] pt-0">
          <table className="mb-[16px]" width="100%">
            <tr>
              <th align="center" className="border border-black py-[8px]">
                <Text className="font-semibold">Criteria</Text>
              </th>
              <th
                align="center"
                className="border border-black py-[8px] text-gray-500"
              >
                <Text className="font-semibold">Passing/Required Score</Text>
              </th>
              <th
                align="center"
                className="border border-black py-[8px] text-gray-500"
              >
                <Text className="font-semibold">Your Score</Text>
              </th>
              <th
                align="center"
                className="border border-black py-[8px] text-gray-500"
              >
                <Text className="font-semibold">Status</Text>
              </th>
            </tr>
            <tr>
              <td align="center" className="border border-black py-[8px]">
                <Text>Practical Training</Text>
              </td>
              <td
                align="center"
                className="border border-black py-[8px] text-gray-500"
              >
                <Text>85%</Text>
              </td>
              <td
                align="center"
                className="border border-black py-[8px] text-gray-500"
              >
                <Text>{trainingScore}%</Text>
              </td>
              <td
                align="center"
                className="border border-black py-[8px] text-gray-500"
              >
                <Text style={{ color: "#008000" }}>{trainingStatus}</Text>
              </td>
            </tr>
            <tr>
              <td align="center" className="border border-black py-[8px]">
                <Text>Digital Interview</Text>
              </td>
              <td
                align="center"
                className="border border-black py-[8px] text-gray-500"
              >
                <Text>85%</Text>
              </td>
              <td
                align="center"
                className="border border-black py-[8px] text-gray-500"
              >
                <Text>{interviewScore}%</Text>
              </td>
              <td
                align="center"
                className="border border-black py-[8px] text-gray-500"
              >
                <Text style={{ color: "#008000" }}>{interviewStatus}</Text>
              </td>
            </tr>
            <tr>
              <td align="center" className="border border-black py-[8px]">
                <Text>Overall Score</Text>
              </td>
              <td
                align="center"
                className="border border-black py-[8px] text-gray-500"
              >
                <Text>85%</Text>
              </td>
              <td
                align="center"
                className="border border-black py-[8px] text-gray-500"
              >
                <Text>{overallScore}%</Text>
              </td>
              <td
                align="center"
                className="border border-black py-[8px] text-gray-500"
              >
                <Text style={{ color: "#008000" }}>{overallStatus}</Text>
              </td>
            </tr>
          </table>
        </Section>
        <Section style={{ ...notice, marginTop: "20px" }}>
          <Text>
            Please bring the following requirements to HR on Logistics within
            the next five (5) business days.
          </Text>
          {/* list here */}
          <Text>1. NSO or PSA</Text>
          <Text>2. Valid ID</Text>
          <Text>3. Updated Resume</Text>
          <Text>4. 2x2 Picture</Text>
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

export const TrainingPassedEmailHTML = (props: TrainingPassedEmailProps) =>
  render(<TrainingPassedEmail {...props} />, {
    pretty: true,
  });

const logoContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
};

const logo = {
  borderRadius: 21,
  width: 42,
  height: 42,
  margin: "0 auto",
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
  textAlign: "center" as const,
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
