import Container from "../../components/ui/container";
import { Button } from "@/components/ui/button";

const OnBoarding: React.FC = () => {
  return (
    <>
      <Container className="overflow-y-scroll h-full flex flex-col justify-center items-center gap-20 text-center">
        <section className="w-[30%]">
          <h1 className="font-bold text-[#218556] text-[3em] tracking-[-0.025em]">Welcome to FireGaurd</h1>
          <p className="font-medium text-[#2d9966] text-xl">
            Protect your home, community, and loved ones. Stay informed and prepared with real-time bushfire risk alerts.
          </p>
        </section>
        <section className="w-[30%] flex flex-col gap-2">
          <Button className="w-full">Next</Button>
          <Button className="w-full" variant={"secondary"}>
            Skip
          </Button>
        </section>
      </Container>
    </>
  );
};

export default OnBoarding;
