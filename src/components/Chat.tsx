// src/components/Chat.jsx
import { useState, useEffect } from "react";
import { sendMessage, ModelType } from "../services/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ModelSelector from "./ModelSelector";

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
  model: ModelType;
}

interface ChatProps {
  onModelChange: (model: ModelType) => void;
  currentModel: ModelType;
}

const Chat = ({ onModelChange, currentModel }: ChatProps) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem("chatHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const loadingMessages = [
    "Tenker ut noe lurt...",
    "Grubler og funderer...",
    "Prosesserer spørsmålet...",
    "Analyserer muligheter...",
  ];

  useEffect(() => {
    let messageInterval: number;
    let secondsInterval: number;

    if (loading) {
      // Update loading message every 5 seconds
      messageInterval = setInterval(() => {
        setLoadingMessage((prev) => (prev + 1) % loadingMessages.length);
      }, 5000);

      // Update seconds counter every second
      secondsInterval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      clearInterval(messageInterval);
      clearInterval(secondsInterval);
      setSeconds(0);
      setLoadingMessage(0);
    };
  }, [loading]);

  // Save to localStorage whenever chatHistory changes
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to history
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: Date.now(),
      model: currentModel,
    };
    setChatHistory((prev) => [...prev, userMessage]);

    setLoading(true);
    try {
      const reply = await sendMessage(input, currentModel);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: typeof reply === "string" ? reply : reply.reply,
        isUser: false,
        timestamp: Date.now(),
        model: currentModel,
      };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Error: Could not get a response.",
        isUser: false,
        timestamp: Date.now(),
        model: currentModel,
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col relative">
      <div className="flex-1 overflow-auto p-4 mb-[140px]">
        <div className="w-[42rem] mx-auto">
          {chatHistory.map((message) => (
            <div
              key={message.id}
              className={`my-4 ${message.isUser ? "flex justify-end" : ""}`}
            >
              <div
                className={`${
                  message.isUser
                    ? "bg-sky-500 text-white"
                    : "bg-blue-50 border border-blue-200 text-blue-900"
                } rounded-lg p-4 shadow max-w-[80%]`}
              >
                <div className="text-xs opacity-50 mb-1">
                  {new Date(message.timestamp).toLocaleTimeString()} -{" "}
                  {message.model}
                </div>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  className="whitespace-pre-wrap"
                >
                  {message.text}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          {loading && (
            <div className="my-4">
              <div className="bg-blue-50 border border-blue-200 text-blue-900 rounded-lg p-4 shadow max-w-[80%]">
                <div className="text-xs opacity-50 mb-1">
                  {new Date().toLocaleTimeString()} - {currentModel}
                </div>
                <p>
                  {loadingMessages[loadingMessage]} ({seconds}s)
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white">
        <ModelSelector
          selectedModel={currentModel}
          onModelChange={onModelChange}
        />
        <form
          onSubmit={handleSubmit}
          className="mx-auto w-[42rem] p-4 flex gap-4"
        >
          <input
            className="flex-grow p-4 text-lg border border-gray-300 rounded-lg placeholder:text-gray-400"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Skriv inn din beskjed..."
          />
          <button
            className="p-4 text-lg font-semibold text-white bg-sky-500 rounded-lg hover:bg-sky-600 disabled:bg-gray-300 transition-colors duration-200"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sender..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
