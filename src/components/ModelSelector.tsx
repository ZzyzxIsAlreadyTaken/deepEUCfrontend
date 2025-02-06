import { ModelType } from "../services/api";

interface Model {
  id: ModelType;
  name: string;
}

interface ModelSelectorProps {
  selectedModel: ModelType;
  onModelChange: (model: ModelType) => void;
}

const ModelSelector = ({
  selectedModel,
  onModelChange,
}: ModelSelectorProps) => {
  const models: Model[] = [
    { id: "deepseek", name: "DeepSeek" },
    {
      id: "gemini-2.0-flash-lite-preview-02-05",
      name: "Gemini 2.0 Flash lite",
    },
    { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash" },
    { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash" },
  ];

  return (
    <div className="w-[42rem] mx-auto p-4 flex gap-4 justify-center">
      {models.map((model) => (
        <label key={model.id} className="inline-flex items-center">
          <input
            type="radio"
            name="model"
            value={model.id}
            checked={selectedModel === model.id}
            onChange={(e) => onModelChange(e.target.value as ModelType)}
            className="form-radio h-4 w-4 text-sky-500"
          />
          <span className="ml-2">{model.name}</span>
        </label>
      ))}
    </div>
  );
};

export default ModelSelector;
