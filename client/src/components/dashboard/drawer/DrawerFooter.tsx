import Container from "@/components/ui/container";

const DrawerFooter: React.FC = () => {
  return (
    <Container className="px-6 hidden sm:block">
      <div className="flex items-center gap-2">
        <p className=" text-zinc-400 py-1 text-sm">
          FireGuard’s machine learning model has achieved 60% accuracy therefore it <i>might</i> predict incorrect bushfire risk level.
        </p>
      </div>
    </Container>
  );
};

export default DrawerFooter;
