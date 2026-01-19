import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { PreferencesProvider, usePreferences } from '@/lib/store'
import { Preference } from '@/types'

// Test component that uses the hook
const TestComponent = () => {
  const { state, updatePreference, updateStage, setBirthInfo, reset } = usePreferences()

  return (
    <div>
      <div data-testid="stage1-count">{state.stage1.filter((p) => p.checked).length}</div>
      <button
        onClick={() => updatePreference('stage1', state.stage1[0].id, true)}
        data-testid="toggle-preference"
      >
        Toggle
      </button>
      <button
        onClick={() =>
          updateStage('stage1', [
            { id: 'new', label: 'New', icon: 'Heart', checked: true },
          ])
        }
        data-testid="update-stage"
      >
        Update Stage
      </button>
      <button
        onClick={() => setBirthInfo('Jane Doe', 'John Doe')}
        data-testid="set-birth-info"
      >
        Set Info
      </button>
      <button onClick={reset} data-testid="reset">
        Reset
      </button>
      {state.birthParent && <div data-testid="birth-parent">{state.birthParent}</div>}
      {state.birthPartner && <div data-testid="birth-partner">{state.birthPartner}</div>}
    </div>
  )
}

describe('PreferencesProvider', () => {
  it('provides initial state', () => {
    render(
      <PreferencesProvider>
        <TestComponent />
      </PreferencesProvider>
    )
    const count = screen.getByTestId('stage1-count')
    expect(count.textContent).toBe('0')
  })

  it('updates preference when toggle is called', () => {
    render(
      <PreferencesProvider>
        <TestComponent />
      </PreferencesProvider>
    )
    const toggleButton = screen.getByTestId('toggle-preference')
    const count = screen.getByTestId('stage1-count')

    expect(count.textContent).toBe('0')
    fireEvent.click(toggleButton)
    expect(count.textContent).toBe('1')
  })

  it('updates stage preferences', () => {
    render(
      <PreferencesProvider>
        <TestComponent />
      </PreferencesProvider>
    )
    const updateButton = screen.getByTestId('update-stage')
    fireEvent.click(updateButton)
    const count = screen.getByTestId('stage1-count')
    expect(count.textContent).toBe('1')
  })

  it('sets birth information', () => {
    render(
      <PreferencesProvider>
        <TestComponent />
      </PreferencesProvider>
    )
    const setInfoButton = screen.getByTestId('set-birth-info')
    fireEvent.click(setInfoButton)

    expect(screen.getByTestId('birth-parent')).toHaveTextContent('Jane Doe')
    expect(screen.getByTestId('birth-partner')).toHaveTextContent('John Doe')
  })

  it('resets state to initial values', () => {
    render(
      <PreferencesProvider>
        <TestComponent />
      </PreferencesProvider>
    )

    // Make some changes
    fireEvent.click(screen.getByTestId('toggle-preference'))
    fireEvent.click(screen.getByTestId('set-birth-info'))

    // Reset
    fireEvent.click(screen.getByTestId('reset'))

    expect(screen.getByTestId('stage1-count')).toHaveTextContent('0')
    expect(screen.queryByTestId('birth-parent')).not.toBeInTheDocument()
  })

  it('handles invalid stage ID gracefully', () => {
    const TestInvalidStage = () => {
      const { updatePreference } = usePreferences()
      return (
        <button
          onClick={() => updatePreference('invalid-stage', 'test-id', true)}
          data-testid="invalid-toggle"
        >
          Toggle Invalid
        </button>
      )
    }

    render(
      <PreferencesProvider>
        <TestInvalidStage />
      </PreferencesProvider>
    )

    // Should not throw error
    expect(() => {
      fireEvent.click(screen.getByTestId('invalid-toggle'))
    }).not.toThrow()
  })
})

describe('usePreferences hook', () => {
  it('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const originalError = console.error
    console.error = jest.fn()

    expect(() => {
      render(<TestComponent />)
    }).toThrow('usePreferences must be used within a PreferencesProvider')

    console.error = originalError
  })
})
