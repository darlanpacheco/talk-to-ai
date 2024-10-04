import WebSocket from "ws";

const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (ws) => {
  console.log("A new client connected");

  ws.on("message", async (message: string) => {
    console.log("Message received");
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/mistralai/Mistral-Nemo-Instruct-2407",
        {
          headers: {
            Authorization: "Bearer TOKEN",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ inputs: message.toString() }),
        },
      );

      const data = await response.json();
      ws.send(data[0].generated_text);
    } catch (error) {
      console.error("Error: ", error);
    }
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
