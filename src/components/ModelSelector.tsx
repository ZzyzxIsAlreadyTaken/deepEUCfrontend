import { ModelType } from "../services/api";

interface Model {
  id: ModelType;
  name: string;
}

interface ModelSelectorProps {
  selectedModel: ModelType;
  onModelChange: (model: ModelType) => void;
  className?: string;
}

const ModelSelector = ({
  selectedModel,
  onModelChange,
  className,
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
    <>
      {/* Mobile Dropdown */}
      <div className={`md:hidden ${className}`}>
        <select
          value={selectedModel}
          onChange={(e) => onModelChange(e.target.value as ModelType)}
          className="w-[95%] mx-auto block p-2 border border-gray-300 rounded-lg bg-white text-gray-800"
        >
          {models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Radio Buttons */}
      <div className="hidden md:flex w-[64rem] mx-auto p-4 gap-4 justify-center">
        {models.map((model) => (
          <label
            key={model.id}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="relative w-4 h-4 flex items-center justify-center">
              <input
                type="radio"
                name="model"
                value={model.id}
                checked={selectedModel === model.id}
                onChange={(e) => onModelChange(e.target.value as ModelType)}
                className="appearance-none w-4 h-4 rounded-full border border-gray-300 checked:border-rose-400 cursor-pointer"
              />
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none ${
                  selectedModel === model.id ? "block" : "hidden"
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-rose-400"></div>
              </div>
            </div>
            <span>{model.name}</span>
          </label>
        ))}
      </div>
    </>
  );
};

export default ModelSelector;
