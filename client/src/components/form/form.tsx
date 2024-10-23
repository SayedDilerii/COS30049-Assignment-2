import React from "react";
import { useForm } from "react-hook-form";

type TForm = {
  defaultValues: object;
  children: React.ReactNode;
  onSubmit: any;
};

export const Form: React.FC<TForm> = ({ defaultValues, children, onSubmit }) => {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) => {
        return child?.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name,
              },
            })
          : child;
      })}
    </form>
  );
};

const Example = () => {
  return <Form onSubmit={(e) => console.log(e)} defaultValues={{ name: "", lastName: "" }}></Form>;
};

export const Input: React.FC = ({ register, name, ...rest }) => {
  return <input {...register(name)} {...rest} type="text" />;
};
