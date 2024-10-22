import type { BaseKey } from "@refinedev/core";

export interface FormFieldProp {
  name: string;
  labelName: string;
}

export interface FormValues {
  name: string;
  staffType: string;
}

export interface StaffCardProps {
  id?: BaseKey | undefined;
  name: string;
  staffType: string;
  photo: string;
}
