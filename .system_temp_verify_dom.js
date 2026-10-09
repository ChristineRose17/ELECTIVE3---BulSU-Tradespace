const { spawn } = require('child_process');
const http = require('http');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function main() {
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9224',
    '--no-first-run',
    '--no-default-browser-check',
    'http://localhost:5173/',
  ]);

  await new Promise((r) => setTimeout(r, 2500));

  const tabs = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9224/json', (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const pageTab = tabs.find((t) => t.type === 'page');
  const ws = new WebSocket(pageTab.webSocketDebuggerUrl);

  ws.onopen = () => {
    ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
    setTimeout(() => {
      ws.send(
        JSON.stringify({
          id: 2,
          method: 'Runtime.evaluate',
          params: {
            expression: `({
              title: document.title,
              rootChildren: document.getElementById('root')?.children.length,
              html: document.getElementById('root')?.innerHTML.slice(0, 300)
            })`,
            returnByValue: true,
          },
        })
      );
    }, 2000);
  };

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id === 2) {
      console.log('Result:', msg.result?.result?.value);
      ws.close();
      edge.kill();
      process.exit(0);
    }
  };
}

main().catch(console.error);
