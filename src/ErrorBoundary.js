import React from 'react'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    render() {
        const { hasError } = this.state
        const { children } = this.props

        if (hasError) {
            return <p>Loading failed! Please reload.</p>
        }

        return children
    }
}

export default ErrorBoundary
