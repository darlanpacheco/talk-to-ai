import { useEffect, useState, useRef } from "react";

export default function App() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const inputRef = useRef(null);
  const chatContainer = useRef(null);

  useEffect(() => {
    const webSocket = new WebSocket("ws://localhost:8080");

    setWs(webSocket);
    webSocket.onopen = () => {
      console.log("Connected to the server");
    };
    webSocket.onclose = () => {
      console.log("Disconnected from the server");
    };
    webSocket.onmessage = (msg) => {
      generateChatMessage("ai", msg.data);
    };
    return () => {
      webSocket.close();
    };
  }, []);

  const generateChatMessage = (sender: string, aiMsg?: string) => {
    const newDiv = document.createElement("div");
    newDiv.className =
      "m-4 max-w-[275px] block break-words rounded-xl p-4 dark:bg-secondary-dark";
    if (sender === "user") {
      newDiv.innerText = inputRef.current.value;
      newDiv.classList.add("self-end");
    } else if (sender === "ai") {
      newDiv.innerText = aiMsg;
    }
    if (chatContainer.current) {
      chatContainer.current.appendChild(newDiv);
    }
    inputRef.current.value = "";
  };

  return (
    <>
      <div className="h-[25px]"></div>
      <div
        ref={chatContainer}
        className="mb-52 flex w-[75%] flex-col md:w-[575px]"
      ></div>
      <div className="fixed bottom-0 flex h-24 w-full justify-center dark:bg-primary-dark">
        <div className="fixed bottom-8 flex w-[75%] items-center justify-between rounded-full dark:bg-secondary-dark md:w-[575px]">
          <input
            ref={inputRef}
            autoFocus
            className="w-full rounded-xl p-4 focus:outline-none dark:bg-secondary-dark"
          />
          <div
            onClick={() => {
              if (ws) {
                if (inputRef.current && inputRef.current.value) {
                  ws.send(inputRef.current.value);
                  generateChatMessage("user");
                }
              }
            }}
            className="mr-2 rounded-full p-5 hover:cursor-pointer dark:bg-tertiary-dark"
          ></div>
        </div>
      </div>
    </>
  );
}
