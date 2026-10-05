import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/marketplace';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          padding: '2rem',
          textAlign: 'center',
          color: '#1e293b',
        }}>
          <div style={{
            background: '#fee2e2',
            color: '#dc2626',
            width: 64,
            height: 64,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem',
          }}>
            <AlertTriangle size={32} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#8b1023' }}>
            Something went wrong loading this section
          </h2>
          <p style={{ maxWidth: 520, color: '#64748b', fontSize: '0.95rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            An unexpected error occurred while rendering the page content. You can reload or return to the marketplace.
          </p>
          {this.state.error && (
            <pre style={{
              background: '#f1f5f9',
              padding: '0.75rem 1rem',
              borderRadius: 8,
              fontSize: '0.825rem',
              color: '#b91c1c',
              maxWidth: '90%',
              overflowX: 'auto',
              marginBottom: '1.5rem',
              textAlign: 'left',
              fontFamily: 'monospace',
            }}>
              {this.state.error.message || String(this.state.error)}
            </pre>
          )}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={this.handleReload}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#8b1023',
                color: '#fff',
                padding: '0.625rem 1.25rem',
                borderRadius: 8,
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <RefreshCw size={16} />
              Reload Page
            </button>
            <button
              type="button"
              onClick={this.handleGoHome}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#f1f5f9',
                color: '#334155',
                padding: '0.625rem 1.25rem',
                borderRadius: 8,
                border: '1px solid #cbd5e1',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Home size={16} />
              Go to Marketplace
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
