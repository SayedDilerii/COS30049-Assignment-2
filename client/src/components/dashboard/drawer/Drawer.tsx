import Container from "../../ui/container";

interface DrawerProps {
  header: React.ReactNode;
  body: React.ReactNode;
  footer: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ header, body, footer }) => {
  return (
    <div className="border border-zinc-200 shadow-2xl absolute w-[98%] h-[550px] left-0 right-0 bottom-4 bg-white m-auto rounded-xl py-8 overflow-y-scroll">
      <Container className="w-full h-full">
        {header}
        {body}
        {footer}
      </Container>
    </div>
  );
};

export default Drawer;
