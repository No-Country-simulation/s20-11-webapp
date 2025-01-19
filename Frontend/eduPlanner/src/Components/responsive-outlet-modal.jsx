import { useIsMobile } from "@/hooks/use-mobile";
import { Link, Outlet, useLocation, useNavigate, useOutlet } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "./ui/drawer";

export function ResponsiveOutletModal({
  trigger,
  title,
  description,
  to,
}) {
  const isMobile = useIsMobile();

  const inOutlet = !!useOutlet();
  const navigate = useNavigate();
  const location = useLocation();

  const isThisModal = location.pathname.includes(to);
  const isModalActive = inOutlet && isThisModal;

  const baseSegment = to.split("/")[0];
  const from = location.pathname.replace(new RegExp(`/${baseSegment}.*$`), "/");

  const onClose = () => {
    navigate(from);
  };

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Link to={to}>{trigger}</Link>
        </DrawerTrigger>
        <DrawerContent className="p-4">
          <DrawerHeader>
            {isModalActive && <DrawerTitle>{title}</DrawerTitle>}
            {description && (
              <DrawerDescription>{description}</DrawerDescription>
            )}
          </DrawerHeader>
          <Outlet context={{ onClose }} />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Link to={to}>{trigger}</Link>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
        {isModalActive && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <Outlet context={{ onClose }} />
      </DialogContent>
    </Dialog>
  );
}
