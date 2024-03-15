import OnboardingProvider from "@/services/providers/onboarding-provider";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => (
  <OnboardingProvider>
    <div className="container min-h-screen py-6">{children}</div>
  </OnboardingProvider>
);

export default Layout;
