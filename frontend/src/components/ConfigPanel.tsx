import { useState } from 'react'
import { Settings, Sparkles, CheckCircle, XCircle, Loader2 } from 'lucide-react'
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
  const [isValidating, setIsValidating] = useState(false)
  const [validationStatus, setValidationStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const validateApiConnection = async (url: string): Promise<boolean> => {
    try {
      const healthUrl = url.replace('/api/chat', '/api/health')
      const response = await fetch(healthUrl, { 
        method: 'GET',
        signal: AbortSignal.timeout(5000) // 5 second timeout
      })
      
      if (response.ok) {
        const data = await response.json()
        return data.status === 'ok'
      }
      return false
    } catch (error) {
      console.error('API validation error:', error)
      return false
    }
  }

  const handleTestConnection = async () => {
    if (!apiUrl.trim()) {
      setValidationStatus({
        type: 'error',
        message: 'Por favor, ingresa la URL del API primero'
      })
      return
    }

    setIsValidating(true)
    setValidationStatus({ type: null, message: '' })

    const isConnected = await validateApiConnection(apiUrl)

    setIsValidating(false)

    if (!isConnected) {
      setValidationStatus({
        type: 'error',
        message: `❌ No se puede conectar con el backend en ${apiUrl}. Verifica que el servidor esté corriendo.`
      })
    } else {
      setValidationStatus({
        type: 'success',
        message: '✅ ¡Conexión exitosa con el backend!'
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!apiKey.trim()) {
      setValidationStatus({
        type: 'error',
        message: 'Por favor, ingresa tu API Key de OpenAI'
      })
      return
    }

    if (!apiUrl.trim()) {
      setValidationStatus({
        type: 'error',
        message: 'Por favor, ingresa la URL del API'
      })
      return
    }

    // Validar conexión con el backend
    setIsValidating(true)
    setValidationStatus({ type: null, message: '' })

    const isConnected = await validateApiConnection(apiUrl)

    if (!isConnected) {
      setIsValidating(false)
      setValidationStatus({
        type: 'error',
        message: `No se puede conectar con el backend en ${apiUrl}. Por favor verifica que el servidor esté corriendo.`
      })
      return
    }

    setValidationStatus({
      type: 'success',
      message: '¡Conexión exitosa con el backend!'
    })
    
    // Pequeño delay para mostrar el mensaje de éxito
    setTimeout(() => {
      setIsValidating(false)
      onSave({ apiKey, model, developerMessage, apiUrl })
    }, 500)
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
              <div className="flex space-x-2">
                <input
                  type="text"
                  id="apiUrl"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  className="input-field flex-1"
                  placeholder="http://localhost:8000/api/chat"
                />
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={isValidating}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isValidating ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    'Probar'
                  )}
                </button>
              </div>
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

            {/* Validation Status */}
            {validationStatus.type && (
              <div className={`p-4 rounded-lg flex items-start space-x-3 ${
                validationStatus.type === 'success' 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                {validationStatus.type === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <p className={`text-sm ${
                  validationStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {validationStatus.message}
                </p>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isValidating}
              className="w-full btn-primary py-3 text-lg flex items-center justify-center space-x-2"
            >
              {isValidating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Validando conexión...</span>
                </>
              ) : (
                <span>Comenzar a Chatear</span>
              )}
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
