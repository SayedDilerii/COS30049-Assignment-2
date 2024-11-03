import { useFireForm } from "@/hooks/useFireForm";
import { ChangeEvent, forwardRef } from "react";
import Container from "../ui/container";

type TNotifications = {
  value: string;
  name: string;
};

type TInitialValue = {
  timezone: Array<string>;
  notification: Array<TNotifications>;
  message: string;
};

type TFormProps = {
  submitCallback: (formData: object) => void;
};

const initialValues: TInitialValue = {
  timezone: ["Australia/Melbourne"],
  notification: [
    { value: "text", name: "Text" },
    { value: "call", name: "Call" },
  ],
  message: "",
};

const defaultValues: TInitialValue = {
  timezone: ["Australia/Perth"],
  notification: [
    { value: "email", name: "Email" },
    { value: "text", name: "Text" },
  ],
  message: "Hello there sir!",
};

const notifications = [
  { value: "email", name: "Email" },
  { value: "text", name: "Text" },
  { value: "call", name: "Call" },
];

const Form = forwardRef<HTMLFormElement, TFormProps>(({ submitCallback }, ref) => {
  const { getFormState, batchUpdateForm, resetToDefault } = useFireForm({ initialValues, defaultValues });

  const formValues = getFormState();
  console.log(formValues.initialValues);

  const handleCheckBoxChange = (event: ChangeEvent<HTMLInputElement>, field: TNotifications) => {
    const isChecked = event.target.checked;
    const currentNotifications = formValues.initialValues.notification as Array<TNotifications>;

    if (isChecked) {
      const exists = currentNotifications.some((n) => n.value === field.value);
      if (!exists) {
        return [...currentNotifications, field];
      }
    } else {
      return currentNotifications.filter((n: TNotifications) => n.value !== field.value);
    }

    return currentNotifications;
  };

  return (
    <>
      <Container className="border w-fit p-4">
        <h3 className="text-xl font-bold mb-4">Form:</h3>
        <form
          ref={ref}
          className="grid gap-8"
          onSubmit={(e) => {
            submitCallback(formValues.initialValues);
            e.preventDefault();
          }}
          onReset={resetToDefault}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="timezone" className="font-semibold">
              Select timezone:
            </label>
            <select
              name="timezone"
              id="timezone"
              onChange={(event) => batchUpdateForm({ ...formValues.initialValues, timezone: [event.target.value] })}
              value={formValues.initialValues.timezone[0]}
            >
              <option value="Australia/Melbourne">Australia/Melbourne</option>
              <option value="Australia/Sydney">Australia/Sydney</option>
              <option value="Australia/Perth">Australia/Perth</option>
              <option value="Australia/Adelaide">Australia/Adelaide</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <h5 className="text-base font-semibold">Notification type:</h5>
            {notifications.map((field) => (
              <div className="w-full flex justify-between" key={field.value}>
                <label htmlFor={field.value}>{field.name}</label>
                <input
                  type="checkbox"
                  name={field.value}
                  id={field.value}
                  onChange={(event) =>
                    batchUpdateForm({
                      ...formValues.initialValues,
                      notification: handleCheckBoxChange(event, {
                        value: field.value,
                        name: field.name,
                      }),
                    })
                  }
                  checked={(formValues.initialValues.notification as Array<TNotifications>).some((value) => value.value === field.value)}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <h5 className="text-base font-semibold">Welcome message:</h5>
            <input
              type="text"
              name="message"
              id="welcome-message"
              className="border placeholder:text-sm p-2"
              placeholder="enter welcome message..."
              value={formValues.initialValues.message} // Add this binding
              onChange={(event) => batchUpdateForm({ ...formValues.initialValues, message: event.target.value })}
            />
          </div>
        </form>
      </Container>
      <Container>
        <div className="mt-4 bg-zinc-100 p-4 border">
          <code className="font-bold">Form values:</code>
          <pre>Timezone: {formValues.initialValues.timezone[0]}</pre>
          <pre>
            Notifications:{" "}
            {formValues.initialValues.notification.map((v: TNotifications) => (
              <code>{v.name} </code>
            ))}
          </pre>
          <pre>Message: {formValues.initialValues.message}</pre>
        </div>
      </Container>
    </>
  );
});

Form.displayName = "Form";

export default Form;
