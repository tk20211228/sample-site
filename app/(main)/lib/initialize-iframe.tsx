import { SelectEvent } from "@/app/(main)/projects/[id]/policies/types/gapi";
import { toast } from "sonner";
import { AppData } from "@/app/(main)/types/apps";
import { APP_IFRAME_CONFIG } from "../projects/[id]/apps/data/app-iframe-config";
import { getAppData } from "@/actions/emm/get-app-data";
import AppSonner from "../projects/[id]/apps/components/table/app-sonner";

// declare const gapi: any;
declare const gapi: {
  load: (api: string, callback: () => void) => void;
  iframes: {
    getContext: () => {
      openChild: (options: {
        url: string;
        where: HTMLElement | null;
        attributes: Record<string, string>;
      }) => {
        register: (
          eventName: string,
          callback: (event: SelectEvent) => void,
          filter: unknown
        ) => void;
      };
    };
    CROSS_ORIGIN_IFRAMES_FILTER: unknown;
  };
};

interface InitializePlayIframeParams {
  token: string;
  containerRef: React.RefObject<HTMLDivElement>;
  enterpriseName: string;
}

export const initializePlayIframe = ({
  token,
  containerRef,
  enterpriseName,
}: InitializePlayIframeParams) => {
  if (!window.gapi) {
    console.log("gapiが読み込まれていません");
    return false;
  }

  const iframeUrl = `${APP_IFRAME_CONFIG.BASE_URL}?token=${token}&locale=${APP_IFRAME_CONFIG.LOCALE}&mode=${APP_IFRAME_CONFIG.MODE}&showsearchbox=true`;

  try {
    const options = {
      url: iframeUrl,
      where: containerRef.current,
      attributes: APP_IFRAME_CONFIG.IFRAME_STYLE,
    };

    const iframe = gapi.iframes.getContext().openChild(options);

    const handleProductSelect = async (event: SelectEvent) => {
      if (event.action === "selected") {
        const appData = await getAppData(event.packageName, enterpriseName);
        toast.success(<AppSonner appData={appData.app_details as AppData} />);
      }
    };

    iframe.register(
      "onproductselect",
      handleProductSelect,
      gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
    );

    console.log("iframeの初期化に成功");
    return true;
  } catch (error) {
    console.error("Failed to initialize iframe:", error);
    toast.error("iFrameの初期化に失敗しました");
    return false;
  }
};
