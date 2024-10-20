import Container from "@/components/ui/container";

const AboutUsPage: React.FC = () => {
  const founders = [
    {
      name: "Anthony Tang",
      status: "Co-Founder",
      role: "Engineering",
    },
    {
      name: "Sayed Dileri",
      status: "Co-Founder",
      role: "Engineering",
    },
    {
      name: "Gloria Shifra A. Halim",
      status: "Co-Founder",
      role: "Engineering",
    },
  ];

  return (
    <Container className="bg-[#106B40] px-4 md:px-44 py-20 flex flex-col gap-24 md:gap-36 xl:gap-44 border-t border-emerald-700 overflow-y-scroll">
      <section className="flex justify-between items-center xl:pt-16">
        <div className="grid gap-4 h-fit flex-[50%] xl:gap-12">
          <p className="text-emerald-200 font-light tracking-tight md:text-xl">About us</p>
          <h1 className="font-bold text-4xl sm:text-[58px] text-balance text-white xl:w-[70%] xl:text-[5rem] xl:tracking-tight" style={{ lineHeight: "1.2" }}>
            Save lives and protect Americans.
          </h1>
          <p className="text-2xl font-semibold text-emerald-300 tracking-tight sm:text-[44px] xl:text-[3rem] xl:font-bold">That’s our mission...</p>
        </div>
        <div className="hidden lg:block">
          <img src="./../../../heart-beat.png" alt="heart beat figure" className="h-[200px] w-[200px] xl:h-[400px] xl:w-[400px]" />
        </div>
      </section>
      <section className="grid gap-4">
        <h1 className="font-semibold text-3xl text-white xl:text-4xl xl:font-bold ">The Story</h1>
        <p className="text-white text-lg tracking-tight xl:w-[70%] xl:text-2xl">
          Driven by the devastating impact of recent bushfires in America, we wanted to create a tool that could help communities, emergency services, and local governments better
          prepare for potential fire risks. <br /> <br /> Our project started as a simple idea in a classroom, and with each step, it has grown into something that could make a
          real difference.
        </p>
      </section>

      <section className="grid gap-12">
        <div className="grid gap-4">
          <h1 className="font-semibold text-3xl text-white xl:text-4xl xl:font-bold">The Founders</h1>
          <p className="text-white text-lg tracking-tight xl:w-[70%] xl:text-2xl">Learn about the people building FireGuard</p>
        </div>
        <div className="flex flex-col gap-16 sm:gap-4 sm:flex-row md:w-full">
          {founders.map((founder) => (
            <div className="grid gap-2 w-full">
              <div className="grid place-items-center h-[256px] xl:h-[500px] overflow-hidden bg-emerald-600 rounded-lg">
                <img
                  src={`${founder.name.startsWith("Gloria") ? "./../../../fun-character-female.png" : "./../../../fun-character-male.png"}`}
                  alt="a fun cartoon character that depicts the founders of this project"
                  className="invert opacity-80 max-w-[200px] max-h-[200px] xl:max-w-[400px] xl:max-h-[400px]"
                />
              </div>
              <div>
                <p className="font-semibold text-lg text-emerald-100">{founder.name}</p>
                <p className="text-emerald-200">{founder.status}</p>
                <p className="text-emerald-300">{founder.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <p className="text-3xl italic font-serif text-emerald-300" style={{ lineHeight: "1.5" }}>
          “Stay safe, <br /> Stay alert”
        </p>
      </section>
    </Container>
  );
};

export default AboutUsPage;
