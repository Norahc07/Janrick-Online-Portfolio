import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from './Button';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught:', error, info);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-state" role="alert">
          <AlertTriangle className="error-state__icon" aria-hidden="true" />
          <h2 className="serif" style={{ marginBottom: '0.5rem' }}>
            Something went wrong
          </h2>
          <p className="muted" style={{ marginBottom: '1.25rem' }}>
            This section could not be displayed. You can try again or return home.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="primary" onClick={this.handleReset}>
              Try again
            </Button>
            <Button variant="secondary" to="/">
              Go home
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
