import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
  Container,
} from '@react-email/components';

export default function VerificationEmail({ otp }) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      <Preview>Your verification code: {otp}</Preview>

      <Container style={styles.container}>
        <Section>
          <Row>
            <Heading as="h2" style={styles.heading}>
              Welcome to CampusSync,
            </Heading>
          </Row>

          <Row>
            <Text style={styles.text}>
              Thank you for registering. Please use the verification code below
              to complete your registration:
            </Text>
          </Row>

          <Row>
            <Text style={styles.otp}>{otp}</Text>
          </Row>

          <Row>
            <Text style={styles.text}>
              If you did not request this code, you can safely ignore this email.
            </Text>
          </Row>

          
        </Section>
      </Container>
    </Html>
    
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Roboto, Verdana, sans-serif',
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  text: {
    fontSize: '14px',
    lineHeight: '1.5',
    marginBottom: '12px',
  },
  otp: {
    fontSize: '24px',
    fontWeight: 'bold',
    letterSpacing: '2px',
    color: '#333',
    margin: '16px 0',
  },
  button: {
    backgroundColor: '#61dafb',
    color: '#000',
    padding: '10px 20px',
    borderRadius: '6px',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
};



