import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  async function generateAnswer() {
    console.log("loading..")
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=APIKEY",
        method: "post",
        data: {
          "contents": [
            { "parts": [{ "text": question }] }
          ],
        },
      });
      
      setAnswer(response.data.candidates[0].content.parts[0].text)
    } catch (error) {
      console.error("Error generating answer:", error);
    }
  }

  return (
    <div>
      <h1>AI</h1>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        cols={30}
        rows={10}
      ></textarea>
      <button onClick={generateAnswer}>Generate answer</button>
      <p>{answer}</p>
    </div>
  )
}

export default App
