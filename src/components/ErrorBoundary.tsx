import { Component, type ReactNode, type ErrorInfo } from 'react'
import styles from './ErrorBoundary.module.css'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, info)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className={styles.wrapper} role="alert">
            <h2 className={styles.title}>Algo salió mal</h2>
            <p className={styles.desc}>
              Ocurrió un error inesperado. Por favor recarga la página.
            </p>
            <button
              className={styles.btn}
              onClick={() => window.location.reload()}
            >
              Recargar página
            </button>
          </div>
        )
      )
    }
    return this.props.children
  }
}
