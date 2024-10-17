import Container from "@/components/ui/container";

const DrawerBody: React.FC = () => {
  return (
    <Container className="px-8 h-full overflow-y-scroll border-t border-b">
      {Array.from({ length: 50 }, () => (
        <p>This is random array that just renders the word BODY</p>
      ))}
    </Container>
  );
};

export default DrawerBody;
