"use client";

import { useState } from "react";

interface DropZoneProps {
  onAppIdReceived?: (appId: string) => void;
  draggedUrl?: string | null;
}

export default function DropZone({
  onAppIdReceived,
  draggedUrl,
}: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const processUrl = (url: string) => {
      const appId = url.match(/id=([^&]+)/)?.[1];
      if (appId) {
        console.log("Extracted App ID:", appId);
        onAppIdReceived?.(appId);
      }
    };

    try {
      // 親コンポーネントから渡されたURLを優先
      if (draggedUrl) {
        processUrl(draggedUrl);
        return;
      }

      // フォールバック: 通常のドロップデータを試行
      const text = e.dataTransfer.getData("text");
      if (text && text.includes("play.google.com")) {
        processUrl(text);
      }
    } catch (err) {
      console.log("Error processing drop:", err);
    }
  };

  return (
    <div
      className={`w-64 h-20 border-2 border-dashed rounded-lg flex items-center justify-center transition-colors ${
        isDragging ? "border-primary bg-primary/10" : "border-gray-300"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p className="text-sm text-gray-500 text-center px-4">
        {isDragging
          ? "ドロップしてアプリを追加"
          : "ここにアプリをドラッグ＆ドロップ"}
      </p>
    </div>
  );
}
