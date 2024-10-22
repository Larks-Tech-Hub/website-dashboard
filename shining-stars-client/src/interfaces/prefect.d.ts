import type { BaseKey } from "@refinedev/core";

export interface FormFieldProp {
  name: string;
  labelName: string;
}

export interface FormValues {
  name: string;
  title: string;
  grade: string;
}

export interface PrefectCardProps {
  id?: BaseKey | undefined;
  name: string;
  gender: string;
  residence: string;
  title: string;
  grade: string;
  photo: string;
}
