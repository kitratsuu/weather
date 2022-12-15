import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Detail from "./screens/detail";
import Home from "./screens/home";
import { ReactQueryDevtools } from "react-query/devtools";
import Multiday from "./screens/16day/multiday";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="h-full w-full flex justify-center text-center">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="details" element={<Detail />} />
            <Route path="4days" element={<Multiday />} />
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
