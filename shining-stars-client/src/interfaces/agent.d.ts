import type { BaseKey } from "@refinedev/core";

export interface AgentCardProp {
  id?: BaseKey | undefined;
  name: string;
  email: string;
  avatar: string;
  noOfStudents: number;
  noOfPrefects: number;
  noOfAdmins: number;
  noOfStaffs: number;
  noOfSliders: number;
  noOfEvents: number;
  noOfNews: number;
}

export interface InfoBarProps {
  icon: ReactNode;
  name: string;
}
