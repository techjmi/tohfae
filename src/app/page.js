import Carousel from "../shared/utils/carousel";
import { Card, CardHeader, CardBody, CardBottom } from "../shared/ui/card";
import Button from "../shared/ui/button";
import { Icon } from "../shared/icons";
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from "../shared/ui/drawer";

export default function Home() {
  const cross = <Icon name="close" size={18} />;
  return (
    <div className="flex flex-col items-center">
     {/* <Carousel /> */}
     <Carousel
  items={[
    <div className="h-full bg-gray-200 flex items-center justify-center">Slide 1</div>,
    <div className="h-full bg-gray-300 flex items-center justify-center">Slide 2</div>,
    <div className="h-full bg-gray-400 flex items-center justify-center">Slide 3</div>,
  ]}
/>
<Card>
<CardHeader>
  <div className="flex w-full justify-between">
    <span>Custom header</span>
    <Button size="sm">Action</Button>
  </div>
</CardHeader>
  <CardBody>
    <p>Card Body</p>
  </CardBody>
  <CardBottom>
    <p>Card Bottom</p>
  </CardBottom>
</Card>

{/* <Button
  // as="button"
  variant="solid"
  color="danger"
  // icon={Icon}
  iconPosition="left"
  className=""
  disabled={false}
  loading={false}
  size="lg"
  radius="sm"
  // href=""
>Test Button</Button> */}
<div>
  <Drawer
    isOpen={true}
    // onClose={() => {}}
    position="right"
    size="md"
    variant="temporary"
    closeOnEsc={true}
    closeOnBackdrop={true}
    lockBodyScroll={true}
  >
    <DrawerHeader>
      <div className="flex w-full justify-between">
        <span>Custom header</span>
        <Button size="sm">Action</Button>
      </div>
    </DrawerHeader>
    <DrawerBody>
      <p>Drawer Body</p>
    </DrawerBody>
    <DrawerFooter>
      <p>Drawer Footer</p>
    </DrawerFooter>
  </Drawer>
</div>
    </div>
  );
}
