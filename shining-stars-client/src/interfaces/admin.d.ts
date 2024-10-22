import type { BaseKey } from "@refinedev/core";

export interface FormFieldProp {
  name: string;
  labelName: string;
}

export interface FormValues {
  title: string;
  name: string;
  message: string;
  description: string;
}

export interface AdminCardProps {
  id?: BaseKey | undefined;
  title: string;
  name: string;
  message: string;
  description: string;
  photo: string;
}
