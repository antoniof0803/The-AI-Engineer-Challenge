import { Zap, Code, Rocket } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: Zap,
      title: 'Fast Development',
      description: 'Built with Vite for lightning-fast development and hot module replacement.'
    },
    {
      icon: Code,
      title: 'TypeScript',
      description: 'Full TypeScript support for better development experience and type safety.'
    },
    {
      icon: Rocket,
      title: 'Modern Stack',
      description: 'React 18, Tailwind CSS, and modern tooling for a great developer experience.'
    }
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Welcome to the
          <span className="text-primary-600"> AI Engineer Challenge</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          A modern React frontend application built with TypeScript, Tailwind CSS, and Vite. 
          This is a starting point for your AI Engineer Challenge project.
        </p>
        <div className="mt-8">
          <button className="btn-primary text-lg px-8 py-3">
            Get Started
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div key={index} className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary-100 rounded-full">
                  <Icon className="h-8 w-8 text-primary-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          )
        })}
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 rounded-lg p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">
          Ready to build something amazing?
        </h2>
        <p className="text-primary-100 mb-6">
          This frontend is ready for you to customize and extend with your own features.
        </p>
        <button className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-2 px-6 rounded-lg transition-colors duration-200">
          Start Building
        </button>
      </div>
    </div>
  )
}

export default Home
