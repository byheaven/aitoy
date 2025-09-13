import { render, screen } from '@testing-library/react'
import Home from '../app/page'
import { LanguageProvider } from '../contexts/LanguageContext'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, initial, animate, whileInView, transition, viewport, style, ...props }: any) => (
      <div className={className} style={style} {...props}>{children}</div>
    ),
    button: ({ children, className, onClick, whileHover, whileTap, ...props }: any) => (
      <button className={className} onClick={onClick} {...props}>{children}</button>
    ),
    li: ({ children, className, initial, whileInView, transition, viewport, ...props }: any) => (
      <li className={className} {...props}>{children}</li>
    ),
  },
  useScroll: () => ({ scrollY: { get: () => 0 } }),
  useTransform: () => ({ get: () => 0 }),
}))

const HomeWithProvider = () => (
  <LanguageProvider>
    <Home />
  </LanguageProvider>
)

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<HomeWithProvider />)

    // Check for the hero title (default is English)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders the language toggle button', () => {
    render(<HomeWithProvider />)

    // Check for language toggle button
    expect(screen.getByText('中文')).toBeInTheDocument()
  })

  it('renders action buttons', () => {
    render(<HomeWithProvider />)

    // Check for CTA buttons
    expect(screen.getByText('Start Creating')).toBeInTheDocument()
    expect(screen.getByText('Browse Gallery')).toBeInTheDocument()
  })

  it('renders feature sections', () => {
    render(<HomeWithProvider />)

    // Check for feature section heading
    expect(screen.getByText('Why Choose AMIO?')).toBeInTheDocument()
  })

  it('renders stats section', () => {
    render(<HomeWithProvider />)

    // Check for some stats
    expect(screen.getByText('15,000+')).toBeInTheDocument()
    expect(screen.getByText('Creators')).toBeInTheDocument()
  })

  it('renders footer', () => {
    render(<HomeWithProvider />)

    // Check for footer content
    expect(screen.getByText('© 2024 AMIO. All rights reserved.')).toBeInTheDocument()
  })
})