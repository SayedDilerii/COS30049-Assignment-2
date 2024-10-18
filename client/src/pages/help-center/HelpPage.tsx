import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordian";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";

const faqs = [
  {
    question: "Is it accessible?",
    answer: "Yes, we ensure it follows accessibility standards.",
  },
  {
    question: "Is it styled?",
    answer: "Yes, it uses modern design principles.",
  },
  {
    question: "Is it animated?",
    answer: "Yes, but animations can be disabled if preferred.",
  },
  // ... Add more FAQs as necessary
];

const HelpPage: React.FC = () => {
  return (
    <Container>
      <section className="bg-[#106B40] h-72 flex items-center px-44">
        <div className="flex flex-col gap-1 text-white">
          <h1 className="text-[3.7em] font-bold">Help Center</h1>
          <p className="text-lg font-medium">Having trouble with FireGuard? We're here to help.</p>
        </div>
      </section>

      <div className="h-20 flex items-center gap-4 bg-[#e0ffe4] px-44 border-b border-green-100 shadow-sm">
        <Button className="">General Questions</Button>
        <Button className="bg-[#b6f7bd] text-[#009951] font-normal hover:bg-green-300">Leave Feedback</Button>
      </div>

      <div className="px-44 py-12">
        <h2 className="text-3xl font-medium text-zinc-500">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="mt-8">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-xl tracking-tight">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-lg text-zinc-500">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Container>
  );
};

export default HelpPage;
