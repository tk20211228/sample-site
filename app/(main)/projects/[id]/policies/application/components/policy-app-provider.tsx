// "use client";

// import { useParams } from "next/navigation";
// import { ReactNode, createContext, useContext, useEffect } from "react";
// import useSWR from "swr";
// import { usePolicy } from "../../../providers/policy";
// import { getApps } from "../data/get-apps";

// type ContextType = {};

// const Context = createContext<ContextType>({
//   apps: [],
//   setApps: () => {},
// } as ContextType);

// export function PolicyAppProvider({ children }: { children: ReactNode }) {
//   const { setApps } = usePolicy();
//   const params = useParams();
//   const enterpriseName = `enterprises/${params.id}`;
//   const policyAppsKey = `policy/apps/${enterpriseName}`;
//   console.log("PolicyAppProvider key", policyAppsKey);
//   const { data: appData } = useSWR(policyAppsKey, () =>
//     getApps(enterpriseName)
//   );

//   useEffect(() => {
//     console.log("PolicyAppProvider appData", appData);
//     setApps(appData ?? []);
//   }, [appData]);

//   return <Context.Provider value={{}}>{children}</Context.Provider>;
// }

// export const usePolicyAppProvider = () => useContext(Context);
