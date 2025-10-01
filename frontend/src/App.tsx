import { useState } from 'react'
import ChatInterface from './components/ChatInterface'
import ConfigPanel from './components/ConfigPanel'

export interface ChatConfig {
  apiKey: string
  model: string
  developerMessage: string
  apiUrl: string
}

function App() {
  const [config, setConfig] = useState<ChatConfig>({
    apiKey: '',
    model: 'gpt-4o-mini',
    developerMessage: 'You are a helpful AI assistant.',
    apiUrl: 'http://localhost:8000/api/chat'
  })

  const [isConfigured, setIsConfigured] = useState(false)

  const handleConfigSave = (newConfig: ChatConfig) => {
    setConfig(newConfig)
    setIsConfigured(true)
  }

  const handleReconfigure = () => {
    setIsConfigured(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {!isConfigured ? (
        <ConfigPanel onSave={handleConfigSave} initialConfig={config} />
      ) : (
        <ChatInterface config={config} onReconfigure={handleReconfigure} />
      )}
    </div>
  )
}

export default App
