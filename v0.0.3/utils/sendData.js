export function sendData(ws, type, data) {
  ws.send(
    JSON.stringify({
      type,
      data,
    })
  );
}