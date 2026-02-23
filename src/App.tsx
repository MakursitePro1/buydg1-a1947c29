import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ResizeTool from "./pages/tools/ResizeTool";
import CropTool from "./pages/tools/CropTool";
import FiltersTool from "./pages/tools/FiltersTool";
import RotateTool from "./pages/tools/RotateTool";
import CompressTool from "./pages/tools/CompressTool";
import ConvertTool from "./pages/tools/ConvertTool";
import BrightnessTool from "./pages/tools/BrightnessTool";
import BlurTool from "./pages/tools/BlurTool";
import SharpenTool from "./pages/tools/SharpenTool";
import TextTool from "./pages/tools/TextTool";
import ColorPickerTool from "./pages/tools/ColorPickerTool";
import GrayscaleTool from "./pages/tools/GrayscaleTool";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tool/resize" element={<ResizeTool />} />
          <Route path="/tool/crop" element={<CropTool />} />
          <Route path="/tool/filters" element={<FiltersTool />} />
          <Route path="/tool/rotate" element={<RotateTool />} />
          <Route path="/tool/compress" element={<CompressTool />} />
          <Route path="/tool/convert" element={<ConvertTool />} />
          <Route path="/tool/brightness" element={<BrightnessTool />} />
          <Route path="/tool/blur" element={<BlurTool />} />
          <Route path="/tool/sharpen" element={<SharpenTool />} />
          <Route path="/tool/text" element={<TextTool />} />
          <Route path="/tool/colorpicker" element={<ColorPickerTool />} />
          <Route path="/tool/grayscale" element={<GrayscaleTool />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
