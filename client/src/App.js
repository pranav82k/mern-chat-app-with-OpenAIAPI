import './App.css';
import { useState, useEffect } from 'react';
import ModelListComponent from './Components/ModelListComponent';
import ChatList from './Components/ChatList';
import InputForm from './Components/InputForm';

function App() {
  const URL = "http://localhost:5000/";
  
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);

  const [currentModel, setCurrentModel] = useState("text-davinci-003");
  const [models, setModels] = useState([]);

  useEffect(() => {
    const modelList = async () => {
      let response  =  await fetch(URL)
      response = await response?.json()
      setModels(response?.models)
    }

    modelList();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(prompt){
      let updatedMessageList = [...messages, { user: 'me', message: prompt }]
      setPrompt("")

      setMessages(updatedMessageList)
      const msgs = updatedMessageList?.map((message) => message?.message).join("\n")
      let response = await fetch(URL,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: msgs,
            model: currentModel
          })
      })

      const data = await response.json();
      setMessages([...updatedMessageList, { user: 'gpt', message: data?.choices}])
      console.log(data)
    }
  }

  return (
    <div>
      {/* Chat History Messages */}
      <p style={{textAlign: 'center', backgroundColor: '#9292a0' }}>Message Logs</p>
      <ChatList messages={messages} />

      {/* Model List */}
      <p style={{textAlign: 'center', backgroundColor: '#9292a0' }}>Current Selected Model: {JSON.stringify(currentModel)}</p>
      { models?.length > 0 ? (
        <>
          <p>Models List</p>
          <ModelListComponent currentModel={currentModel} models={models} setCurrentModel={setCurrentModel} />
        </>
      )
    : null }
      <InputForm handleSubmit={handleSubmit} prompt={prompt} setPrompt={setPrompt} />
    </div>
  );
}

export default App;
