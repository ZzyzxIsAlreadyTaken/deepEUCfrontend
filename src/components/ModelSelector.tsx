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
    { id: "gemini", name: "Gemini" },
  ];

  return (
    <div className="w-[42rem] mx-auto p-4 flex gap-4 justify-center border-t border-gray-200">
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
