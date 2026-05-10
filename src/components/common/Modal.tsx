import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface ModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  children?: React.ReactNode;
}

export const Modal = (props: ModalProps) => {
  const { title, description, onClose, isOpen, children } = props;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] sm:w-full sm:max-w-125 rounded-xl">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-slate-600">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
