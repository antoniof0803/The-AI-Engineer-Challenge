import { Users, Target, Lightbulb } from 'lucide-react'

const About = () => {
  const stats = [
    { label: 'Components', value: '10+' },
    { label: 'Pages', value: '3' },
    { label: 'Features', value: '5+' }
  ]

  const values = [
    {
      icon: Target,
      title: 'Purpose',
      description: 'Built specifically for the AI Engineer Challenge to demonstrate modern frontend development practices.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Leveraging the latest technologies and best practices in React development.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Designed to be easily extensible and customizable for different use cases.'
    }
  ]

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About This Project
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          This frontend application is part of the AI Engineer Challenge, showcasing modern 
          web development practices with React, TypeScript, and Tailwind CSS.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {stat.value}
            </div>
            <div className="text-gray-600">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Values */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div key={index} className="card">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary-100 rounded-lg mr-3">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {value.title}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Technology Stack
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'React 18',
            'TypeScript',
            'Vite',
            'Tailwind CSS',
            'React Router',
            'Lucide Icons',
            'ESLint',
            'PostCSS'
          ].map((tech, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
              <span className="text-sm font-medium text-gray-700">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About
