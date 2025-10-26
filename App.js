import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

function App() {
  const [html, setHtml] = useState("<h1>Hello, world!</h1>");
  const [css, setCss] = useState("h1 { color: blue; text-align: center; }");
  const [js, setJs] = useState("console.log('Hello from JS')");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const source = `
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>${js}</script>
          </body>
        </html>
      `;
      setSrcDoc(source);
    }, 300);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <header className="p-3 bg-gray-800 text-center text-xl font-bold">
        🧠 Online Code Editor (HTML + CSS + JS)
      </header>

      <div className="flex flex-1">
        <div className="w-1/2 grid grid-rows-3 border-r border-gray-700">
          <div>
            <div className="bg-gray-800 p-2 text-sm font-semibold">HTML</div>
            <Editor
              height="30vh"
              language="html"
              theme="vs-dark"
              value={html}
              onChange={(v) => setHtml(v || "")}
            />
          </div>
          <div>
            <div className="bg-gray-800 p-2 text-sm font-semibold">CSS</div>
            <Editor
              height="30vh"
              language="css"
              theme="vs-dark"
              value={css}
              onChange={(v) => setCss(v || "")}
            />
          </div>
          <div>
            <div className="bg-gray-800 p-2 text-sm font-semibold">JS</div>
            <Editor
              height="30vh"
              language="javascript"
              theme="vs-dark"
              value={js}
              onChange={(v) => setJs(v || "")}
            />
          </div>
        </div>

        <div className="w-1/2">
          <iframe
            srcDoc={srcDoc}
            sandbox="allow-scripts"
            frameBorder="0"
            width="100%"
            height="100%"
            title="Output"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default App;

