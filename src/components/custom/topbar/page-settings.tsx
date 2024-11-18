import { ReactNode } from "react";

export default function PageSettings({ children }: { children: ReactNode }) {

  return (
    <div className="flex flex-row gap-5">
      {children}
    </div>
  )

}
