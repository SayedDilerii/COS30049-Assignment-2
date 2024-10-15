import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordian";
import Container from "@/components/ui/container";
import { ChevronDown } from "lucide-react";
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
        <h1>Help Center</h1>
        <p>Having trouble with FireGuard? We're here to help.</p>

        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          {/* <ul>
            {faqs.map((faq, index) => (
              <li key={index} onClick={() => toggleFAQ(index)}>
                <strong>{faq.question}</strong>
                {activeIndex === index && <p>{faq.answer}</p>}
              </li>
            ))}
          </ul> */}
          {/*faqs.map((value) => (
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Is it accessible?
                  <ChevronDown />
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))*/}
          {faqs.map((faq, index) => (
            <Accordion key={index} type="single" collapsible>
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger>{faq.question}
                  <ChevronDown />
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
        ))}
        </div>
      </section>
    </Container>
  );
};

export default HelpPage;
