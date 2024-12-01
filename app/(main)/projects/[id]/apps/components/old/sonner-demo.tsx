"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SonnerDemo() {
  return (
    <Button
      variant="outline"
      className="text-xs p-2 h-8"
      onClick={() =>
        // toast("Event has been created", {
        //   description: "Sunday, December 03, 2023 at 9:00 AM",
        //   action: {
        //     label: "Undo",
        //     onClick: () => console.log("Undo"),
        //   },
        // })
        toast.success("Event has been created")
      }
    >
      Show Toast
    </Button>
  );
}
