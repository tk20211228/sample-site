import OnboardingForm from "./components/onboardingForm";

export default function Page() {
  return (
    <div className="lg:absolute inset-0 flex place-items-center p-4">
      <div className="m-auto">
        <OnboardingForm />
      </div>
    </div>
  );
}