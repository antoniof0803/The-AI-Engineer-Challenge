import { useState } from 'react'
import { Settings, Sparkles } from 'lucide-react'
import { ChatConfig } from '../App'

interface ConfigPanelProps {
  onSave: (config: ChatConfig) => void
  initialConfig: ChatConfig
}

const ConfigPanel = ({ onSave, initialConfig }: ConfigPanelProps) => {
  const [apiKey, setApiKey] = useState(initialConfig.apiKey)
  const [model, setModel] = useState(initialConfig.model)
  const [developerMessage, setDeveloperMessage] = useState(initialConfig.developerMessage)
  const [apiUrl, setApiUrl] = useState(initialConfig.apiUrl)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!apiKey.trim()) {
      alert('Por favor, ingresa tu API Key de OpenAI')
      return
    }
    onSave({ apiKey, model, developerMessage, apiUrl })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-primary-600 rounded-full">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            OpenAI Chat Interface
          </h1>
          <p className="text-gray-600">
            Configura tu conexión con la API para comenzar
          </p>
        </div>

        {/* Configuration Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center mb-6">
            <Settings className="h-6 w-6 text-primary-600 mr-2" />
            <h2 className="text-2xl font-semibold text-gray-900">Configuración</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
                OpenAI API Key *
              </label>
              <input
                type="password"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="input-field"
                placeholder="sk-..."
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Tu API key se almacena solo en tu navegador y no se comparte
              </p>
            </div>

            <div>
              <label htmlFor="apiUrl" className="block text-sm font-medium text-gray-700 mb-2">
                API URL
              </label>
              <input
                type="text"
                id="apiUrl"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                className="input-field"
                placeholder="http://localhost:8000/api/chat"
              />
              <p className="mt-1 text-xs text-gray-500">
                URL de tu backend FastAPI (default: http://localhost:8000/api/chat)
              </p>
            </div>

            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                Modelo
              </label>
              <select
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="input-field"
              >
                <option value="gpt-4o-mini">GPT-4o Mini</option>
                <option value="gpt-4o">GPT-4o</option>
                <option value="gpt-4-turbo">GPT-4 Turbo</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              </select>
            </div>

            <div>
              <label htmlFor="developerMessage" className="block text-sm font-medium text-gray-700 mb-2">
                Mensaje del Sistema (Developer Message)
              </label>
              <textarea
                id="developerMessage"
                value={developerMessage}
                onChange={(e) => setDeveloperMessage(e.target.value)}
                className="textarea-field"
                rows={4}
                placeholder="You are a helpful AI assistant..."
              />
              <p className="mt-1 text-xs text-gray-500">
                Define el comportamiento y personalidad del asistente
              </p>
            </div>

            <button type="submit" className="w-full btn-primary py-3 text-lg">
              Comenzar a Chatear
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Asegúrate de que tu backend FastAPI esté corriendo en {apiUrl.replace('/api/chat', '')}
        </p>
      </div>
    </div>
  )
}

export default ConfigPanel
