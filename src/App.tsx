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
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">
          <span className="text-3xl font-bold">
            {currentModel === "deepseek" ? "deep" : "Gemini"}
          </span>
          EUC
        </h1>
        <Chat onModelChange={handleModelChange} currentModel={currentModel} />
      </div>
    </>
  );
}

export default App;
