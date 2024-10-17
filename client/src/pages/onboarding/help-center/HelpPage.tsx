import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordian";
import Container from "@/components/ui/container";
import { useState } from "react";

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
  // Add more FAQs as necessary
];

const HelpPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Container>
      <section>
        <div className="bg-[#106B40] text-white py-6 text-center">
         <h1 className="text-4xl font-bold">Help Center</h1>
         <p className="mt-2 text-xl">Having trouble with FireGuard? We're here to help.</p>
        </div>

          {/* Button Group */}
        <div className="flex justify-center my-6">
         <button className="bg-[#00b47d] text-white font-semibold py-2 px-6 rounded-l-lg">General Questions</button>
         <button className="bg-[#d9f7ec] text-[#00b47d] font-semibold py-2 px-6 rounded-r-lg border-l border-[#00b47d]">About Us</button>
        </div>

      <div className="container mx-auto px-40">
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <Accordion key={index} type="single" collapsible>
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
        ))}
        </div>
      </div> 
      </section>
    </Container>
  );
};

export default HelpPage;
