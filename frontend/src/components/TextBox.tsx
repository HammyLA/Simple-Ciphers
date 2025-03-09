import React from 'react'
import '../styles/InOut.css'
import '../styles/CipherComponent.css'

interface TextBoxProps {
  type: "input" | "output";
  text: string;
  setText?: (value: string) => void
}

/**
 * Text box component for inputs and outputs.
 * @param param0 The type of textbox (input or output), the text string, and the set function for changing the text.
 * @returns The textbox component.
 */
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
