// import { createClient } from "@/lib/supabase/client";
import Header from "../cilent-side-login/components/header";

export default function Page() {
  // const supabase = createClient();
  return (
    <div className="flex flex-col container">
      <Header />
      <h1 className="">ログイン</h1>
      {/* <button
        onClick={() => {
          supabase.auth.signInAnonymously();
        }}
      ></button> */}
    </div>
  );
}
