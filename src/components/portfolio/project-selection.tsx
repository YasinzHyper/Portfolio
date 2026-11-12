"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type ProjectId = "algoace" | "schemafit" | "ossready";
type ProjectSelection = { project: ProjectId; selectProject: (id: ProjectId) => void };
const ProjectContext = createContext<ProjectSelection | null>(null);

export function ProjectSelectionProvider({ children }: { children: ReactNode }) {
  const [project, selectProject] = useState<ProjectId>("algoace");
  const value = useMemo(() => ({ project, selectProject }), [project]);
  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

export function useProjectSelection() {
  const context = useContext(ProjectContext);
  if (!context) throw new Error("Project selection requires ProjectSelectionProvider.");
  return context;
}
