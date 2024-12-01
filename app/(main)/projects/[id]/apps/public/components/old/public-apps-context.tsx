// "use client";

// import { getAndroidEnterpriseWebToken } from "@/actions/emm/get-web-token";
// import { useParams } from "next/navigation";
// import useSWR from "swr";
// import PublicAppsIframe from "./public-apps-iframe";

// export default function PublicAppsContext() {
//   const params = useParams();
//   const enterpriseId = params.id;
//   const enterpriseName = "enterprises/" + enterpriseId;

//   const {
//     data: token,
//     error,
//     isLoading,
//   } = useSWR(enterpriseName, getAndroidEnterpriseWebToken);

//   if (isLoading) return <div>Loading...</div>;
//   if (error || !token) return <div>Error fetching token</div>;

//   return (
//     <>
//       <PublicAppsIframe WebToken={token} enterpriseName={enterpriseName} />
//     </>
//   );
// }
