import { COMPLETED_STEPS } from "@/constants";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const useMultiStepForm = () => {
  const pathname = usePathname();
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  useEffect(() => {
    const completedSteps = getFromLocalStorage(COMPLETED_STEPS) || [];
    setCompletedSteps(completedSteps);
  }, []);

  const markAsCompleted = () => {
    if (!completedSteps.includes(pathname)) {
      const updatedSteps = [...completedSteps, pathname];
      setCompletedSteps(updatedSteps);
      saveToLocalStorage(COMPLETED_STEPS, updatedSteps);
    }
  };

  return { completedSteps, markAsCompleted };
};
