import React from 'react'
import '../styles/InOut.css'
import '../styles/CipherComponent.css'

interface TextBoxProps {
  type: "input" | "output";
  text: string;
  setText?: (value: string) => void
}

const TextBox: React.FC<TextBoxProps> = ({ type, text, setText }) => {
  const max = 1024;

  return (
    <div className='container'>
      <h3>{type === "input" ? "Input" : "Output"}</h3>
      {type === "input" ? (
        <textarea
          value={text}
          onChange={(e) => setText && setText(e.target.value)}
          maxLength={max}
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <textarea readOnly value={text || ''} />
        </div>
      )}
      <p>{type === "input" ? `${text.length} / ${max}` : ""}</p>
    </div>
  )
}

export default TextBox
