import type { BaseKey } from "@refinedev/core";

export interface FormFieldProp {
  activity: string;
  labelName: string;
}

export interface FormValues {
  activity: string;
  description: string;
  date: string;
  place: string;
}

export interface EventCardProps {
  id?: BaseKey | undefined;
  activity: string;
  description: string;
  date: string;
  place: string;
  photo: string;
}
