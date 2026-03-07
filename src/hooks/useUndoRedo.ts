import { useCallback, useRef, useState } from "react";

interface UndoRedoState {
  canUndo: boolean;
  canRedo: boolean;
  saveState: (canvas: HTMLCanvasElement) => void;
  undo: (canvas: HTMLCanvasElement) => void;
  redo: (canvas: HTMLCanvasElement) => void;
  reset: () => void;
}

export function useUndoRedo(maxHistory = 30): UndoRedoState {
  const history = useRef<string[]>([]);
  const pointer = useRef(-1);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const updateFlags = useCallback(() => {
    setCanUndo(pointer.current > 0);
    setCanRedo(pointer.current < history.current.length - 1);
  }, []);

  const saveState = useCallback((canvas: HTMLCanvasElement) => {
    const dataUrl = canvas.toDataURL("image/png");
    // Remove any future states after current pointer
    history.current = history.current.slice(0, pointer.current + 1);
    history.current.push(dataUrl);
    if (history.current.length > maxHistory) {
      history.current.shift();
    } else {
      pointer.current++;
    }
    updateFlags();
  }, [maxHistory, updateFlags]);

  const restoreState = useCallback((canvas: HTMLCanvasElement, dataUrl: string) => {
    const img = new Image();
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext("2d")!.drawImage(img, 0, 0);
    };
    img.src = dataUrl;
  }, []);

  const undo = useCallback((canvas: HTMLCanvasElement) => {
    if (pointer.current <= 0) return;
    pointer.current--;
    restoreState(canvas, history.current[pointer.current]);
    updateFlags();
  }, [restoreState, updateFlags]);

  const redo = useCallback((canvas: HTMLCanvasElement) => {
    if (pointer.current >= history.current.length - 1) return;
    pointer.current++;
    restoreState(canvas, history.current[pointer.current]);
    updateFlags();
  }, [restoreState, updateFlags]);

  const reset = useCallback(() => {
    history.current = [];
    pointer.current = -1;
    updateFlags();
  }, [updateFlags]);

  return { canUndo, canRedo, saveState, undo, redo, reset };
}
