import UsernamePasswordSignUpForm from "./components/username-password-sign-up-form";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center m-auto pt-2 lg:pt-10">
      <div className="flex flex-row justify-items-center w-full px-4 lg:w-1/3">
        <UsernamePasswordSignUpForm />
      </div>
    </div>
  );
}
