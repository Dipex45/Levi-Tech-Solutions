import { Component, type ErrorInfo, type ReactNode } from 'react';
import { TriangleAlert } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught application error', error, errorInfo);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center bg-navy p-8 text-center text-white">
        <TriangleAlert className="mb-6 h-12 w-12 text-cyan" />
        <h1 className="mb-4 text-4xl font-bold">Something went wrong.</h1>
        <p className="mb-8 max-w-md text-sm leading-relaxed text-white/60">Sorry, this page didn’t load properly. Please go back to the home page and try again.</p>
        <button className="btn-primary" onClick={() => (window.location.href = '/')}>Go to home page</button>
      </div>
    );
  }
}
