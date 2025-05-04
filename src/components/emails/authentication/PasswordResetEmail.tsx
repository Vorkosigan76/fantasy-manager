import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Section,
  Text,
  Tailwind,
  Button,
} from "@react-email/components";

interface PasswordResetEmailProps {
  email: string;
  link: string;
}

export default function PasswordResetEmail({
  email = "test@test.com",
  link = "http://www.google.com",
}: PasswordResetEmailProps) {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Body className="bg-white">
          <Container className="bg-white rounded-sm border border-solid border-l-neutral-400 shadow-md max-w-[360px] mt-0 mb-0 ml-auto mr-auto pt-16 pb-32 pl-0 pr-0">
            <Text className="text-center text-blue-600 text-lg font-bold uppercase h-4 tracking-normal leading-4 mt-4 mb-2 ml-2 mr-2">
              Password Reset
            </Text>
            <Section className="pt-3 pb-7 pl-0 pr-0 text-center justify-center items-center">
              <Button
                className="bg-sky-500 text-white text-center font-medium text-lg rounded-md py-3 px-4 ml-4 mr-4 shadow hover:bg-primary/90"
                href={link}
              >
                Reset your Passwrd
              </Button>
            </Section>
            <Text className="text-center text-slate-600 text-sm leading-6 tracking-normal pt-0 pb-0 pr-10 pl-10 m-0">
              This link will be valid for the next 15 minutes.
              <br /> If the link does not work, you can use the link below.
            </Text>
            <Section className="text-center">
              <Link
                href={link}
                className="text-blue-600 underline text-lg m-auto"
              >
                {link}
              </Link>
            </Section>

            <Text className="text-center text-slate-600 text-sm leading-6 tracking-normal pt-4 pb-0 pr-10 pl-10 m-0">
              Not expecting this email?
            </Text>
            <Text className="text-center text-slate-600 text-sm leading-6 tracking-normal pt-0 pb-0 pr-10 pl-10 m-0">
              Contact{" "}
              <Link
                href={"mailto:" + email}
                className="text-slate-400 underline"
              >
                {email}
              </Link>
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
