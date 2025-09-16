import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('Frontend ErrorBoundary caught an error:', error, info)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
          <div className="max-w-md w-full bg-white shadow rounded-lg p-6 text-center">
            <h1 className="text-xl font-semibold mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-4">An unexpected error occurred. You can try again or reload the page.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={this.handleRetry} className="px-4 py-2 bg-indigo-600 text-white rounded">Try again</button>
              <button onClick={() => window.location.reload()} className="px-4 py-2 bg-gray-200 text-gray-800 rounded">Reload</button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary


