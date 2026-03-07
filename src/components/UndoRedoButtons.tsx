import { Button } from "@/components/ui/button";
import { Undo2, Redo2 } from "lucide-react";

interface UndoRedoButtonsProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

const UndoRedoButtons = ({ canUndo, canRedo, onUndo, onRedo }: UndoRedoButtonsProps) => (
  <div className="grid grid-cols-2 gap-2">
    <Button variant="outline" size="sm" onClick={onUndo} disabled={!canUndo} className="gap-1.5">
      <Undo2 className="h-4 w-4" /> Undo
    </Button>
    <Button variant="outline" size="sm" onClick={onRedo} disabled={!canRedo} className="gap-1.5">
      <Redo2 className="h-4 w-4" /> Redo
    </Button>
  </div>
);

export default UndoRedoButtons;
