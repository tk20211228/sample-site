"use client";

import { useEffect, useRef, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { DraggedItemsList } from "./DraggedItemsList";

type DraggedItem = {
  id: string;
  url: string;
  html: string;
};

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [draggedItems, setDraggedItems] = useState<DraggedItem[]>([]);
  const [draggedItemData, setDraggedItemData] = useState<DraggedItem | null>(
    null
  ); // ドラッグ中のデータを保持
  const wrapperRef = useRef<HTMLDivElement>(null);

  // ドラッグオーバーのハンドラーをコンポーネントのトップレベルで定義
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // ドロップのハンドラーもトップレベルで定義
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItemData) {
      setDraggedItems((prev) => [...prev, draggedItemData]);
      setDraggedItemData(null);
    }
  };

  useEffect(() => {
    setIsClient(true);

    /**
     * MutationObserverは、DOMツリーの変更を監視するためのWebAPIです。
     * 指定された要素やその子要素の変更（追加、削除、属性変更など）を検知できます
     */
    const observer = new MutationObserver((mutations) => {
      // 監視対象のDOM変更が発生したときに実行されるコールバック
      const wrapper = wrapperRef.current;
      if (!wrapper) {
        console.log("Wrapper not found"); // デバッグ用
        return;
      }

      const iframe = wrapper.querySelector("iframe");
      if (!iframe) {
        console.log("Iframe not found"); // デバッグ用
        return;
      }

      // cleanup関数を保持する変数
      let cleanup: (() => void) | undefined;

      const setupIframeEvents = () => {
        // 新しいイベントリスナーを設定する前に、既存のものをクリーンアップ
        if (cleanup) cleanup();
        try {
          const iframeDocument =
            iframe.contentDocument || iframe.contentWindow?.document;
          if (!iframeDocument) {
            console.log("No iframe document found");
            return;
          }

          // デバックのため、クリックイベントのリスナーを追加
          const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            console.log("target", target);
            // imgタグの場合の処理を追加
            const imgElement = target as HTMLImageElement;
            console.log("Image src:", imgElement.getAttribute("src"));
            if (target instanceof HTMLImageElement) {
              console.log("Image src:", target.src);
            }
            console.log("Clicked:", {
              target: target,
              parentElement: target.parentElement?.dataset,
              x: e.clientX,
              y: e.clientY,
            });
          };

          // ドラッグイベントのリスナーを追加
          const handleDragStart = (e: DragEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName.toLowerCase() === "img") {
              const imgElement = target as HTMLImageElement;
              const url = imgElement.getAttribute("src") || "";
              // ドラッグ開始時にはデータを一時保存
              setDraggedItemData({
                id: uuidv4(),
                url: url,
                html: imgElement.outerHTML,
              });
            }
          };

          // イベントリスナーを追加
          iframeDocument.addEventListener("click", handleClick);
          iframeDocument.addEventListener("dragstart", handleDragStart);
          console.log("Events attached successfully"); // デバッグ用

          // 新しい cleanup 関数を保存
          cleanup = () => {
            iframeDocument.removeEventListener("click", handleClick);
            iframeDocument.removeEventListener("dragstart", handleDragStart);
          };
        } catch (error) {
          console.error("Error setting up iframe events:", error);
        }
      };
      iframe.onload = setupIframeEvents;
    });

    // DOM変更の監視を開始
    observer.observe(document.body, {
      childList: true, //直接の子要素の追加や削除を監視
      subtree: true, //すべての子孫要素の変更も監視対象に含める
    });

    return () => observer.disconnect();
  }, []);

  if (!isClient) return <div>Loading...</div>;

  return (
    <main className="p-4">
      <div className="flex gap-4">
        <div
          ref={wrapperRef}
          style={{
            position: "relative",
            width: "400px",
            height: "400px",
            border: "1px solid #ccc",
          }}
        >
          <iframe
            // src="/test.html"
            src={
              "https://play.google.com/managed/search?token=WAC-A26zCR6ZfoEoEdx_xnCfT-DHnB8-3Z3xEB6em062VaFz4bvhWmUVERcRTkuK6Js9rlcFQJUA9rvXeK3C0tF1jVKu-mbPwj5JYZaDXmx1xEmAQ8GfhzQXsG9CIrfwXf2Qd_4Bo4EhXVWXxzmTTMh95DutZjzQ0N9eueo0NGESclVa6cSumyKk4-fgHtLYKiJL40CTwS8UjwoNPopwshks-_6mnNhdCcg&mode=APPROVE&showsearchbox=FALSE&search=chrome&hl=ja_JP"
            }
            width="100%"
            height="100%"
            style={{ border: "none" }}
          />
        </div>
        <DraggedItemsList
          items={draggedItems}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        />
      </div>
    </main>
  );
}
