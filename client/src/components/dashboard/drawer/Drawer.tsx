import Container from "../../ui/container";

interface DrawerProps {
  header: React.ReactNode;
  body: React.ReactNode;
  footer: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ header, body, footer }) => {
  return (
    <div className="overflow-y-scroll h-full">
      <Container className="w-full h-full flex flex-col justify-between">
        {header}
        {body}
        {footer}
      </Container>
    </div>
  );
};

export default Drawer;
