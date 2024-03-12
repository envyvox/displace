import OnboardingProvider from "@/services/providers/onboarding-provider";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => (
  <OnboardingProvider>
    <div className="container grid md:grid-cols-7">
      <div className="hidden md:col-span-2 md:block lg:col-span-1"></div>
      <div className="col-span-3 px-4 py-6 md:col-span-5 lg:col-span-6">
        {children}
      </div>
    </div>
  </OnboardingProvider>
);

export default Layout;
