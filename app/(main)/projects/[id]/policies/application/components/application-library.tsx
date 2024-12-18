"use client";

import { Input } from "@/components/ui/input";
import { usePolicy } from "../../../providers/policy";
import AppCard from "./app-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function ApplicationLibrary() {
  const { apps } = usePolicy();
  const [filterApps, setFilterApps] = useState("");
  const [appType, setAppType] = useState("all");
  const [status, setStatus] = useState("all");

  const filteredApps = apps.filter((app) => {
    return (
      app.title.toLowerCase().includes(filterApps.toLowerCase()) &&
      (appType === "all" || app.appType === appType) &&
      (status === "all" ||
        (status === "disabled"
          ? app.disabled
          : (status === "UNSET" && !app.installType) || // installTypeが未設定の場合
            app.installType === status))
    );
    // status === "disabled" の場合：無効化されたアプリ（app.disabled === true）のみを表示
  });

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4">アプリケーション一覧</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        <Input
          type="text"
          placeholder="アプリケーション名を検索"
          value={filterApps}
          onChange={(e) => setFilterApps(e.target.value)}
        />
        <Select value={appType} onValueChange={setAppType}>
          <SelectTrigger className="w-1/3">
            <SelectValue placeholder="アプリ種別" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全てのアプリ種類</SelectItem>
            <SelectItem value="PUBLIC">Google Play</SelectItem>
            <SelectItem value="PRIVATE">限定公開</SelectItem>
            <SelectItem value="WEB">WEB</SelectItem>
            <SelectItem value="CUSTOM">カスタム</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-1/3">
            <SelectValue placeholder="ステータス" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全てのステータス</SelectItem>
            <SelectItem value="UNSET">未設定</SelectItem>
            <SelectItem value="FORCE_INSTALLED">
              利用可能(自動インストール)
            </SelectItem>
            <SelectItem value="BLOCKED">インストール不可</SelectItem>
            <SelectItem value="AVAILABLE">
              利用可能(手動インストール)
            </SelectItem>
            <SelectItem value="disabled">アプリ無効</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 space-y-1">
        {filteredApps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}
