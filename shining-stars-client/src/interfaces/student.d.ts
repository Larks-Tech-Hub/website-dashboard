import type { BaseKey } from "@refinedev/core";

export interface FormFieldProp {
  name: string;
  labelName: string;
}

export interface FormValues {
  name: string;
  stid: string;
  paymentCode: string;
  parent_name: string;
  parent_email: string;
  grade: string;
}

export interface StudentCardProps {
  id?: BaseKey | undefined;
  name: string;
  stid: string;
  grade: string;
  gender: string;
  residence: string;
  paymentCode: string;
  parent_name: string;
  parent_email: string;
}
