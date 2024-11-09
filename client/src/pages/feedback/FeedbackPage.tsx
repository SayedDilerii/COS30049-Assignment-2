import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useFireForm } from "@/hooks/useFireForm";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { post } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { CircleAlert } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z, ZodError } from "zod";

const DEFAULT_VALUES = {
  full_name: "",
  email: "",
  feedback: "",
};

type TPayload = {
  full_name: string;
  email: string;
  feedback: string;
};

type Response = {
  success: boolean;
  message: string;
};

const FeedbackPage: React.FC = () => {
  const [showThankYou, setShowThankYou] = useState<boolean>(false);
  const { getFormState, batchUpdateForm, resetToDefault } = useFireForm({ initialValues: DEFAULT_VALUES, defaultValues: DEFAULT_VALUES });

  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 700px)");
  const formValues = getFormState();

  // Update state on input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    batchUpdateForm({ ...formValues.initialValues, [name]: value });
  };

  const mutation = useMutation({
    mutationFn: (form: TPayload) => {
      return post<TPayload, Response>("/feedback", form);
    },
    retry: 1,
    onSuccess: () => {
      setShowThankYou(true);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Handle form submission
  const handleFormSubmit = (payload: TPayload) => {
    try {
      const feedbackSchema = z.object({
        full_name: z.string().min(1, { message: "Full name field cannot be empty!" }).max(50, { message: "Full name cannot exceed over 50 characters" }),
        email: z.string().min(1, { message: "Email field cannot be empty!" }).email({ message: "Invalid email format" }),
        feedback: z.string().min(1, { message: "Feedback cannot be empty!" }),
      });
      feedbackSchema.parse(payload);
      mutation.mutate(payload);
    } catch (error) {
      if (error instanceof ZodError) {
        const parsedMessage: Array<ZodError> = JSON.parse(error.message);
        parsedMessage.map((field) => {
          return toast.error(field.message, { icon: <CircleAlert size={16} color="red" />, duration: 3000 });
        });
      }
    }
  };

  const DisplayTooltip = () => {
    if (isDesktop) {
      return (
        <TooltipProvider delayDuration={250} skipDelayDuration={120}>
          <Tooltip>
            <TooltipTrigger type="button" className="cursor-help hidden sm:block">
              <p className="underline">Why email?</p>
            </TooltipTrigger>
            <TooltipContent className="bg-zinc-700 text-white rounded-lg p-4">
              <p>Why do you need my email address?</p>
              <p className="text-balance mt-2 font-light">
                Your email address will not be used for any marketing purposes. <br /> In order for us to keep the bad guys out, we require your email address to ensure you are
                real.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    return (
      <Drawer>
        <DrawerTrigger className="sm:hidden underline">Why email?</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-xl text-start py-4">Why do you need my email address?</DrawerTitle>
            <DrawerDescription className="text-start text-[16px]">
              Your email address will not be used for any marketing purposes. In order for us to keep the bad guys out, we require your email address to ensure you are real.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>
              <Button className="w-full py-4 font-bold">Ok, Got it</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  };

  return (
    <Container>
      <section className="bg-[#106B40] h-44 sm:h-72 flex items-center px-4 sm:px-44">
        <div className="flex flex-col gap-2 sm:gap-6 text-white text-balance">
          <h1 className="text-3xl sm:text-[3.7em] font-bold">Leave Feedback</h1>
          <p className="sm:text-lg font-light sm:font-medium">We’re happy to hear what you think could be improved with our platform.</p>
        </div>
      </section>

      <div className="py-2 flex items-center gap-2 sm:gap-4 bg-[#e0ffe4] pl-4 sm:px-44 border-b border-green-100 shadow-sm">
        <Button className="bg-[#b6f7bd] text-[#009951] hover:bg-green-300" onClick={() => navigate("/help-page")}>
          General Questions
        </Button>
        <Button onClick={() => navigate("/feedback")}>Leave feedback</Button>
      </div>

      <div className="flex flex-col items-center gap-8 px-4 py-12">
        <div className="w-full sm:w-1/2">
          <form className="grid gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-2">
              <Label>
                Full Name <span className="text-orange-700">*</span>
              </Label>
              <Input
                name="full_name"
                value={formValues.initialValues.full_name}
                onChange={(event) => handleInputChange(event)}
                placeholder="Enter full name..."
                type="text"
                className="shadow-sm rounded-lg border-zinc-300"
              />
            </div>
            <div className="grid gap-2">
              <Label className="flex items-center justify-between">
                <span>
                  Email Address <span className="text-orange-700">*</span>
                </span>
                <DisplayTooltip />
              </Label>
              <Input
                name="email"
                value={formValues.initialValues.email}
                onChange={(event) => handleInputChange(event)}
                placeholder="Your email address..."
                type="email"
                className="shadow-sm rounded-lg border-zinc-300"
              />
            </div>
            <div className="grid gap-2">
              <Label>
                Your thoughts on FireGuard <span className="text-orange-700">*</span>
              </Label>
              <textarea
                name="feedback"
                value={formValues.initialValues.feedback}
                onChange={(event) => handleInputChange(event)}
                placeholder="Please enter your feedback..."
                className="flex min-h-[80px] w-full border-zinc-300 shadow-sm rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </form>
          <div className="mt-8 grid gap-2">
            <Button className="w-full" type="submit" onClick={() => handleFormSubmit(formValues.initialValues)}>
              Submit
            </Button>
            <Button className="w-full bg-zinc-100 hover:bg-zinc-200" variant={"ghost"} type="submit" onClick={() => navigate("/community-feedback")}>
              View community feedback
            </Button>
          </div>
        </div>
      </div>

      {/* Thank You Modal */}
      {showThankYou && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
            <p>Your feedback has been submitted successfully.</p>
            <Button
              onClick={() => {
                setShowThankYou(false);
                resetToDefault();
              }}
              className="mt-4"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default FeedbackPage;
