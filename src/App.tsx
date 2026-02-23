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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
