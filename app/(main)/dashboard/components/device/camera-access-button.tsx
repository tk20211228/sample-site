"use client";

import { Button } from "@/components/ui/button";
import { Camera, CameraOff } from "lucide-react";
import { useState } from "react";
import { cameraOnOffPolicy } from "../../actions/policy";

export default function CameraAccessButton({ parent }: { parent: string }) {
  const [cameraState, setCameraState] = useState<boolean>(false);

  const onClick = async () => {
    if (cameraState) {
      await cameraOnOffPolicy(parent, true).then(() => {
        setCameraState(!cameraState);
      });
    } else {
      await cameraOnOffPolicy(parent, false).then(() => {
        setCameraState(!cameraState);
      });
    }
  };
  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground size-10 transition-all duration-300 hover: hover:text-foreground z-30 "
        onClick={onClick}
      >
        {cameraState ? <CameraOff /> : <Camera />}
      </Button>
    </div>
  );
}
