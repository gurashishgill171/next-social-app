import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

interface CustomDialogProps {
  title: string;
  message: string;
  open: boolean;
  onClose: () => void;
  onClick: () => void;
}

export default function CustomDialog({
  open,
  onClose,
  title,
  message,
  onClick,
}: CustomDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={"destructive"}
            onClick={() => {
              onClick();
              onClose();
            }}
          >
            Delete
          </Button>
          <Button variant={"secondary"} onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
