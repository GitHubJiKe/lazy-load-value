import React, { useState } from "react";
import "./App.css";
import { AppTexts, Locale, youGuessWhatIamDoing } from "./constants";

function getItems(count: number) {
  return new Array(count).fill("");
}

/**
 * 模拟模块
 */
function Block({ text = youGuessWhatIamDoing }: { text?: string }) {
  return (
    <div style={{ border: "1px solid red", margin: 5 }}>
      <p>{text}</p>
    </div>
  );
}

function App() {
  const [locale, setLocale] = useState<Locale>("zh");
  return (
    <div className="App">
      <h1>{AppTexts.title(locale)}</h1>
      <p>{AppTexts.someText(locale)}</p>
      {getItems(5).map((_, idx) => (
        <Block key={idx} />
      ))}
      <Block text="你猜猜看？" />
      <button
        onClick={() => {
          if (locale === "en") {
            setLocale("zh");
          } else {
            setLocale("en");
          }
        }}
      >
        切换语言
      </button>
    </div>
  );
}

export default App;
