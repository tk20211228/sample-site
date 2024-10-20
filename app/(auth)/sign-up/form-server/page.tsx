import { SignUpFormClientSide } from "../components/sign-up-form-client-side";
import { SignUpFormServerSide } from "../components/sign-up-form-sever-side";

export default function Page() {
  return (
    <div className="m-auto">
      <SignUpFormServerSide />
    </div>
  );
}
