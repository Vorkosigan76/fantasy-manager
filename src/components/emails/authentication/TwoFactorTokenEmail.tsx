import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface TwoFactorTokenEmailProps {
  email: string;
  token: string;
}

export default function TwoFactorTokenEmail({
  email = "test@test.com",
  token = "000000",
}: TwoFactorTokenEmailProps) {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Body className="bg-white">
          <Container className="bg-white rounded-sm border border-solid border-l-neutral-400 shadow-md max-w-[360px] mt-0 mb-0 ml-auto mr-auto pt-16 pb-32 pl-0 pr-0">
            <Text className="text-center text-blue-600 text-lg font-bold uppercase h-4 tracking-normal leading-4 mt-4 mb-2 ml-2 mr-2">
              2-Factor Identification
            </Text>
            <Heading className="inline-block text-center color-black text-xl font-medium leading-6 mb-0 mt-0 w-full">
              Enter the following code to log in.
            </Heading>
            <Section className="bg-black/5 rounded-sm mt-4 mb-3 ml-auto mr-auto align-middle w-[280px]">
              <Text className="inline-block text-black text-center text-3xl font-bold tracking-wider leading-10 pb-2 pt-2 mt-0 mb-0 ml-auto mr-auto w-full">
                {token}
              </Text>
            </Section>
            <Text className="text-center text-slate-600 text-sm leading-6 tracking-normal pt-0 pb-0 pr-10 pl-10 m-0">
              Not expecting this email?
            </Text>
            <Text className="text-center text-slate-600 text-sm leading-6 tracking-normal pt-0 pb-0 pr-10 pl-10 m-0">
              Contact{" "}
              <Link
                href={"mailto:" + email}
                className="text-slate-400 underline"
              >
                {email}
              </Link>{" "}
              if you did not request this code.
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
