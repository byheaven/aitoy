import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext'

// Test component that uses the language context
const TestComponent = () => {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div>
      <span data-testid="current-language">{language}</span>
      <button onClick={() => setLanguage('zh')}>Switch to Chinese</button>
      <button onClick={() => setLanguage('en')}>Switch to English</button>
      <span data-testid="translated-text">{t('hero.title')}</span>
    </div>
  )
}

describe('LanguageContext', () => {
  it('provides default language context', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    // Default language should be English
    expect(screen.getByTestId('current-language')).toHaveTextContent('en')
  })

  it('allows language switching', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    // Switch to Chinese
    fireEvent.click(screen.getByText('Switch to Chinese'))
    expect(screen.getByTestId('current-language')).toHaveTextContent('zh')

    // Switch back to English
    fireEvent.click(screen.getByText('Switch to English'))
    expect(screen.getByTestId('current-language')).toHaveTextContent('en')
  })

  it('provides translation function', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    // Translation function should work (even if just returning the key)
    const translatedText = screen.getByTestId('translated-text')
    expect(translatedText).toBeInTheDocument()
    expect(translatedText.textContent).toBeTruthy()
  })
})