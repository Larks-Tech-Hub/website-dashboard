/* eslint-disable no-plusplus */
import { FormValues } from 'interfaces/student';

export const validateForm = (formValues: FormValues) => {
  const errors: { message: string } = { message: '' };
  let hasError = false;

  Object.keys(formValues).forEach((key) => {
    switch (key) {
      case 'name':
        if (!formValues.name) {
          errors.message = 'Name is required';
          hasError = true;
        }
        break;

      case 'grade':
        if (!formValues.grade) {
          errors.message = 'Grade is required';
          hasError = true;
        }
        break;

      case 'paymentCode':
        if (!formValues.paymentCode) {
          errors.message = 'Payment Code is required';
          hasError = true;
        }
        break;

      default:
        hasError = false;
    }
  });

  return { hasError, errors };
};

export const hasChanged = (initialValues: FormValues, currentValues: FormValues) => {
  const initialValuesArray = Object.values(initialValues);
  const currentValuesArray = Object.values(currentValues);
  for (let i = 0; i < initialValuesArray.length; i++) {
    if (initialValuesArray[i] !== currentValuesArray[i]) {
      return true;
    }
  }
  return false;
};