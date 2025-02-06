import "./App.css";
import Chat from "./components/Chat";
import { useState } from "react";
import { ModelType } from "./services/api";

function App() {
  const [currentModel, setCurrentModel] = useState<ModelType>("deepseek");

  const handleModelChange = (model: ModelType) => {
    setCurrentModel(model);
  };

  return (
    <>
      {/* Fixed Header with Full-Width Background */}
      <div className="fixed top-0 w-full bg-white z-10">
        {/* Centered Content Container */}
        <div className="mx-auto max-w-4xl w-full flex justify-center items-center py-4">
          <h1 className="text-2xl font-bold mb-4">
            <span className="text-3xl font-bold">
              {currentModel === "deepseek" ? "deep" : "Gemini"}
            </span>
            EUC
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-start pt-24 min-h-screen">
        <Chat onModelChange={handleModelChange} currentModel={currentModel} />
      </div>
    </>
  );
}

export default App;
