import type { BaseKey } from "@refinedev/core";

export interface FormFieldProp {
  title: string;
  labelName: string;
}

export interface FormValues {
  title: string;
  description: string;
}

export interface NewCardProps {
  id?: BaseKey | undefined;
  title: string;
  description: string;
  photo: string;
  type: string;
}
