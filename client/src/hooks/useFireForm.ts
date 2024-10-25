import { useState } from "react";

type TFireForm = {
  initialValues: object;
  defaultValues: object;
};

type TFireFormReturn = {
  resetToDefault: () => void;
  getFormState: () => any;
  batchUpdateForm: (payload: any) => void;
};

export function useFireForm({ initialValues, defaultValues }: TFireForm): TFireFormReturn {
  const [formValues, setFormValues] = useState({ initialValues });

  const getFormState = () => {
    return { ...formValues };
  };

  const batchUpdateForm = (payload: any) => {
    setFormValues({ initialValues: payload });
  };

  const resetToDefault = () => {
    setFormValues({ initialValues: defaultValues });
  };

  return {
    resetToDefault,
    getFormState,
    batchUpdateForm,
  };
}
