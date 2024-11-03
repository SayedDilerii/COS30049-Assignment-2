import Form from "@/components/form/form";
import Container from "@/components/ui/container";
import { useRef } from "react";

// Go to localhost:5173/sandbox

const SandBoxPage: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const submitHandler = (payload: object) => {
    console.log(payload);
  };

  const handleExternalSubmit = () => {
    formRef.current?.requestSubmit();
  };

  const handleExternalRest = () => {
    formRef.current?.reset();
  };

  return (
    <>
      <Container className="w-full flex flex-col items-center gap-4 justify-center h-screen">
        <Form submitCallback={submitHandler} ref={formRef} />
        <div className="flex gap-2">
          <button className="bg-zinc-200 text-black p-2" type="submit" onClick={handleExternalRest}>
            Reset
          </button>
          <button className="bg-zinc-800 text-white p-2" type="reset" onClick={handleExternalSubmit}>
            Submit
          </button>
        </div>
      </Container>
    </>
  );
};

export default SandBoxPage;
