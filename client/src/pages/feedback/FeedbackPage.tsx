import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const FeedbackPage: React.FC = () => {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 700px)");

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
    <Container className="overflow-y-scroll">
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
          <form className="grid gap-6" onSubmit={(ev: FormEvent) => ev.preventDefault()}>
            <div className="grid gap-2">
              <Label>
                Full Name <span className="text-orange-700">*</span>
              </Label>
              <Input placeholder="Enter full name..." type="text" className="shadow-sm rounded-lg border-zinc-300" />
            </div>
            <div className="grid gap-2">
              <Label className="flex items-center justify-between">
                <span>
                  Email Address <span className="text-orange-700">*</span>
                </span>
                <DisplayTooltip />
              </Label>
              <Input placeholder="Your email address..." type="email" className="shadow-sm rounded-lg border-zinc-300" />
            </div>
            <div className="grid gap-2">
              <Label>
                Your thoughts on FireGuard <span className="text-orange-700">*</span>
              </Label>
              <textarea
                placeholder="Please enter your feedback..."
                className="flex min-h-[80px] w-full border-zinc-300 shadow-sm rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div>
              <Button className="w-full">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default FeedbackPage;
