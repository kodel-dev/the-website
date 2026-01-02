"use client";

import { useState } from "react";
import CopilotBubble from "./CopilotBubble";
import CopilotPanel from "./CopilotPanel";

export default function AICopilot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CopilotBubble onClick={() => setOpen((o) => !o)} />
      <CopilotPanel open={open} />
    </>
  );
}
