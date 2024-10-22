import type { BaseKey } from "@refinedev/core";

export interface FormFieldProp {
  name: string;
  admission_no: string;
}

export interface FormValues {
  name: string;
  admission_no: string;
  date_of_birth: string;
  age: string;
  gender: string;
  grade: string;
  residence: string;
  term: string;
  emis_no: string;
  parent_name: string;
  parent_email: string;
  parent_telephone: string;
  parent_relationship_with_pupil: string;
  parent_address: string;
  parent_village: string;
  parent_lc: string;
  parent_nin: string;
  next_of_kin_name: string;
  next_of_kin_gender: string;
  next_of_kin_telephone: string;
  next_of_kin_relationship_with_pupil: string;
  next_of_kin_address: string;
  next_of_kin_village: string;
  next_of_kin_lc: string;
  child_medical_info: string;
}

export interface AdmissionCardProps {
  id?: BaseKey | undefined;
  name: string;
  admission_no: string;
  date_of_birth: string;
  age: string;
  gender: string;
  grade: string;
  residence: string;
  term: string;
  emis_no: string;
  parent_name: string;
  parent_email: string;
  parent_telephone: string;
  parent_relationship_with_pupil: string;
  parent_address: string;
  parent_village: string;
  parent_lc: string;
  parent_nin: string;
  next_of_kin_name: string;
  next_of_kin_gender: string;
  next_of_kin_telephone: string;
  next_of_kin_relationship_with_pupil: string;
  next_of_kin_address: string;
  next_of_kin_village: string;
  next_of_kin_lc: string;
  child_medical_info: string;
}
