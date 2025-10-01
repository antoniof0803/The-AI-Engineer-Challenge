import { useState, useRef, useEffect } from 'react'
import { Send, Settings, Loader2, User, Bot } from 'lucide-react'
import { ChatConfig } from '../App'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatInterfaceProps {
  config: ChatConfig
  onReconfigure: () => void
}

const ChatInterface = ({ config, onReconfigure }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        // Build base URL (remove /chat or /api/chat from the end)
        const baseUrl = config.apiUrl
          .replace(/\/api\/chat\/?$/, '')
          .replace(/\/chat\/?$/, '')
        
        // Try multiple health check endpoints
        const healthUrls = [
          `${baseUrl}/health`,
          `${baseUrl}/api/health`
        ]
        
        for (const healthUrl of healthUrls) {
          try {
            const response = await fetch(healthUrl, { method: 'GET' })
            if (response.ok) {
              const data = await response.json()
              if (data.status === 'ok') {
                setApiStatus('online')
                return
              }
            }
          } catch (err) {
            continue
          }
        }
        
        setApiStatus('offline')
      } catch (error) {
        setApiStatus('offline')
      }
    }

    checkApiHealth()
    const interval = setInterval(checkApiHealth, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [config.apiUrl])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch(config.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          developer_message: config.developerMessage,
          user_message: userMessage,
          model: config.model,
          api_key: config.apiKey,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error('No reader available')
      }

      let assistantMessage = ''
      setMessages(prev => [...prev, { role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        assistantMessage += chunk
        
        setMessages(prev => {
          const newMessages = [...prev]
          newMessages[newMessages.length - 1] = {
            role: 'assistant',
            content: assistantMessage
          }
          return newMessages
        })
      }
    } catch (error) {
      console.error('Error:', error)
      let errorMessage = 'Error desconocido'
      
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        errorMessage = `No se puede conectar al servidor API en ${config.apiUrl}.\n\nPosibles soluciones:\n1. Verifica que el backend esté corriendo (python api/app.py o uvicorn api.app:app)\n2. Confirma que la URL del API sea correcta\n3. Revisa que el puerto sea el correcto (por defecto: 8000)`
      } else if (error instanceof Error) {
        errorMessage = error.message
      }
      
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `❌ Error: ${errorMessage}`
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-600 rounded-lg">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Chat con OpenAI</h1>
                <div className="flex items-center space-x-3">
                  <p className="text-sm text-gray-500">Modelo: {config.model}</p>
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${
                      apiStatus === 'online' ? 'bg-green-500' : 
                      apiStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
                    }`} />
                    <span className={`text-xs ${
                      apiStatus === 'online' ? 'text-green-600' : 
                      apiStatus === 'offline' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {apiStatus === 'online' ? 'API Conectada' : 
                       apiStatus === 'offline' ? 'API Desconectada' : 'Verificando...'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={onReconfigure}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span>Configurar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-20">
              <Bot className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg">Comienza una conversación</p>
              <p className="text-sm mt-2">Escribe un mensaje para empezar</p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex items-start space-x-3 max-w-3xl ${
                  message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-300 text-gray-700'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="h-5 w-5" />
                  ) : (
                    <Bot className="h-5 w-5" />
                  )}
                </div>
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-900'
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{message.content}</p>
                </div>
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="input-field flex-1"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="btn-primary px-6 flex items-center space-x-2"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
              <span>{isLoading ? 'Enviando...' : 'Enviar'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface
