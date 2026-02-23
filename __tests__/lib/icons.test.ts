import { getPreferenceIcon, PREFERENCE_ICONS } from '@/lib/icons'

describe('lib/icons', () => {
  describe('getPreferenceIcon', () => {
    it('returns correct icon for known preference names', () => {
      expect(getPreferenceIcon('Syringe')).toBe(PREFERENCE_ICONS.Syringe)
      expect(getPreferenceIcon('Heart')).toBe(PREFERENCE_ICONS.Heart)
      expect(getPreferenceIcon('Baby')).toBe(PREFERENCE_ICONS.Baby)
      expect(getPreferenceIcon('Scissors')).toBe(PREFERENCE_ICONS.Scissors)
    })

    it('returns Circle (fallback) for unknown icon name', () => {
      const result = getPreferenceIcon('UnknownIcon')
      expect(result).toBe(PREFERENCE_ICONS.Circle)
    })

    it('returns Circle for empty string', () => {
      const result = getPreferenceIcon('')
      expect(result).toBe(PREFERENCE_ICONS.Circle)
    })

    it('handles Droplets alias mapping to Droplet', () => {
      expect(getPreferenceIcon('Droplets')).toBe(PREFERENCE_ICONS.Droplet)
    })

    it('handles Coffee alias mapping to Beaker', () => {
      expect(getPreferenceIcon('Coffee')).toBe(PREFERENCE_ICONS.Beaker)
    })

    it('handles Bottle alias mapping to Beaker', () => {
      expect(getPreferenceIcon('Bottle')).toBe(PREFERENCE_ICONS.Beaker)
    })
  })
})
