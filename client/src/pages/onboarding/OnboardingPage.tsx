import { useState } from "react";
import Container from "../../components/ui/container";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import FaviconPlaceholder from "@/components/onboarding/FaviconPlaceholder";
import { Bell, Check, MapPin, Star } from "lucide-react";

// TODO: make it response as per Figma design.
const OnBoardingPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    if (currentSlide >= 0 && currentSlide <= 3) {
      setCurrentSlide((currentSlide) => currentSlide + 1);
    }
  };

  const skipSlides = () => {
    navigate("/dashboard");
  };

  const steps = [
    {
      icon: <FaviconPlaceholder isIcon={false} children={"./../../../image 2.png"} />,
      heading: <p>Welcome to FireGuard</p>,
      caption: <p>Protect your home, community, and loved ones. Stay informed and prepared with real-time bushfire risk alerts.</p>,
      isLastSlide: false,
    },
    {
      icon: <FaviconPlaceholder isIcon icon={MapPin} />,
      heading: <p>USA wide</p>,
      caption: <p>FireGuard monitors bushfire risks in your area using precise location data, ensuring you receive the most relevant updates.</p>,
      isLastSlide: false,
    },
    {
      icon: <FaviconPlaceholder isIcon icon={Bell} />,
      heading: <p>Be aware of risks</p>,
      caption: (
        <p>
          We categorize bushfire risk into five levels: Low, Moderate, High, Severe, and Extreme. This helps you gauge the severity and take
          appropriate action.
        </p>
      ),
      isLastSlide: false,
    },
    {
      icon: <FaviconPlaceholder isIcon icon={Star} />,
      heading: <p>Personalized Experience</p>,
      caption: (
        <p>FireGuard tailors alerts and recommendations based on your location and home environment for a safer, more personalized experience.</p>
      ),
      isLastSlide: false,
    },
    {
      icon: <FaviconPlaceholder isIcon icon={Check} />,
      heading: <p>You’re all set</p>,
      caption: <p>Stay safe, stay informed, and check back regularly for updates.</p>,
      isLastSlide: true,
    },
  ];

  return (
    <>
      <Container className="overflow-y-scroll h-full flex flex-col justify-center items-center gap-20 text-center">
        {steps
          .filter((_, index) => index === currentSlide)
          .map((value) => (
            <>
              <section className="w-[30%] flex justify-center">{value.icon}</section>
              <section className="w-[30%]">
                <h1 className="font-bold text-[#218556] text-[3em] tracking-[-0.025em]">{value.heading}</h1>
                <p className="font-medium text-[#2d9966] text-xl">{value.caption}</p>
              </section>
              <section className="w-[30%] flex flex-col gap-2">
                <Button className="w-full" onClick={!value.isLastSlide ? () => nextSlide() : () => skipSlides()} size={"lg"}>
                  {value.isLastSlide ? "Explore App" : "Next"}
                </Button>
                {!value.isLastSlide && (
                  <Button className="w-full" variant={"secondary"} onClick={() => skipSlides()} size={"lg"}>
                    Skip
                  </Button>
                )}
              </section>
              <section>
                <div className="flex gap-2">
                  {Array.from({ length: 5 }, (_, key) => (
                    <div
                      key={key}
                      className={`${key === currentSlide ? "w-[100px] bg-emerald-300" : "w-[32px]"} bg-emerald-100 rounded-full h-[12px]`}
                    ></div>
                  ))}
                </div>
              </section>
            </>
          ))}
      </Container>
    </>
  );
};

export default OnBoardingPage;
