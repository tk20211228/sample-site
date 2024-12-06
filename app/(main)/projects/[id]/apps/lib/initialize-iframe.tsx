import { AppsTableType, AppType } from "@/app/(main)/types/apps";
import { toast } from "sonner";
import AppSonner from "../components/table/app-sonner";
import { APP_IFRAME_CONFIG } from "../data/app-iframe-config";
import { getAppData } from "../data/get-app-info";

type SelectEvent = {
  action: "selected";
  packageName: string;
};
// declare const gapi: any;
// ※ この型は、公式ドキュメントには存在しないため、型定義を自作
// https://developers.google.com/android/management/apps?hl=ja#step_2_render_the_iframe
// https://developers.google.com/android/management/apps?hl=ja#step_3_handle_iframe_events
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
  token?: string | null;
  containerRef: React.RefObject<HTMLDivElement>;
  enterpriseName: string;
  appType: AppType;
  mutate?: (
    updater?: (currentData: AppsTableType[] | undefined) => AppsTableType[]
  ) => void;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

/**
 * アプリ選択画面のiframeを初期化する
 * @param token - アクセストークン
 * @param containerRef - iframeを表示するコンテナのref
 * @param enterpriseName - エンタープライズ名
 * @param mutate - データ更新関数
 * @param appType - DBに保存するアプリの種類
 * @param onSuccess - 初期化成功時のコールバック関数
 * @returns boolean - 初期化成功かどうか
 */
export const initializePlayIframe = ({
  token,
  containerRef,
  enterpriseName,
  appType,
  mutate,
  onSuccess,
  onError,
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
        try {
          const data = await getAppData(
            event.packageName,
            enterpriseName,
            appType
          );
          toast.success(<AppSonner appData={data} />);
          // mutate?.();
          // 楽観的更新: 現在のデータを取得して新しいアプリを追加
          mutate?.((currentData: AppsTableType[] | undefined) => {
            if (!currentData) return [data]; // 現在のデータがない場合は新しいアプリのみを返す

            // 既に存在するアプリを探す
            const existingIndex = currentData.findIndex(
              (app) => app.name === data.name
            );

            const newApp = data;

            if (existingIndex !== -1) {
              const updatedData = [...currentData]; // 現在のデータをコピー
              updatedData.splice(existingIndex, 1); // 既存のアプリを削除
              return [newApp, ...updatedData]; // 更新したアプリを先頭に追加して返す
            }
            return [newApp, ...currentData]; // 新しいアプリを配列の先頭に追加して返す
          });
        } catch (error) {
          toast.error("アプリデータの取得に失敗しました" + error);
          onError?.(error);
        }
      }
    };

    iframe.register(
      "onproductselect",
      handleProductSelect,
      gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
    );

    // console.log("iframeの初期化に成功");
    onSuccess?.();
    return true;
  } catch (error) {
    console.error("Failed to initialize iframe:", error);
    toast.error("iFrameの初期化に失敗しました");
    onError?.(error);
    return false;
  }
};
