// "use client";

// import { useParams } from "next/navigation";
// import {
//   ReactNode,
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// type ContextType = {
//   enterpriseId: string;
//   setEnterpriseId: (id: string) => void;
//   enterpriseName: string;
//   setEnterpriseName: (name: string) => void;
// };

// const Context = createContext<ContextType>({
//   enterpriseId: "",
//   setEnterpriseId: () => {},
//   enterpriseName: "",
//   setEnterpriseName: () => {},
// } as ContextType);

// export function EnterpriseProvider({ children }: { children: ReactNode }) {
//   const [enterpriseId, setEnterpriseId] = useState<string>("");
//   const [enterpriseName, setEnterpriseName] = useState<string>("");
//   const params = useParams();

//   useEffect(() => {
//     // 正規表現を使ってURLからenterpriseIdを抽出
//     // const match = pathname.match(/\/projects\/([^/]+)(?:\/|$)/);
//     // const id = match ? match[1] : null;
//     // if (id) {
//     //   setEnterpriseId(id);
//     //   const name = "enterprises/" + id;
//     //   setEnterpriseName(name);
//     // }
//     setEnterpriseId(params.id as string);
//     setEnterpriseName("enterprises/" + params.id);
//   }, [params.id]);

//   return (
//     <Context.Provider
//       value={{
//         enterpriseId,
//         setEnterpriseId,
//         enterpriseName,
//         setEnterpriseName,
//       }}
//     >
//       {children}
//     </Context.Provider>
//   );
// }

// export const useEnterprise = () => useContext(Context);
