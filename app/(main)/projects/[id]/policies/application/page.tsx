import { ScrollArea } from "@/components/ui/scroll-area";
import AppContent from "./components/app-content";

export default function Page() {
  return (
    <div className="flex-1 h-dvh min-w-0">
      <ScrollArea className="h-full">
        <AppContent />
      </ScrollArea>
    </div>
  );
}
