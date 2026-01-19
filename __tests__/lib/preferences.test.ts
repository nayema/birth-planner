import { getInitialPreferences, stage1Preferences, stage2Preferences, stage3Preferences, stage4Preferences } from '@/lib/preferences'

describe('preferences', () => {
  describe('getInitialPreferences', () => {
    it('returns stage1 preferences', () => {
      const prefs = getInitialPreferences('stage1')
      expect(prefs).toHaveLength(stage1Preferences.length)
      expect(prefs[0]).toMatchObject({
        id: expect.any(String),
        label: expect.any(String),
        icon: expect.any(String),
        checked: false,
      })
    })

    it('returns stage2 preferences', () => {
      const prefs = getInitialPreferences('stage2')
      expect(prefs).toHaveLength(stage2Preferences.length)
    })

    it('returns stage3 preferences', () => {
      const prefs = getInitialPreferences('stage3')
      expect(prefs).toHaveLength(stage3Preferences.length)
    })

    it('returns stage4 preferences', () => {
      const prefs = getInitialPreferences('stage4')
      expect(prefs).toHaveLength(stage4Preferences.length)
    })

    it('returns empty array for invalid stage', () => {
      const prefs = getInitialPreferences('invalid')
      expect(prefs).toEqual([])
    })

    it('returns new instances (not references)', () => {
      const prefs1 = getInitialPreferences('stage1')
      const prefs2 = getInitialPreferences('stage1')
      prefs1[0].checked = true
      expect(prefs2[0].checked).toBe(false)
    })
  })

  describe('preference structure', () => {
    it('stage1 preferences have required fields', () => {
      stage1Preferences.forEach((pref) => {
        expect(pref).toHaveProperty('id')
        expect(pref).toHaveProperty('label')
        expect(pref).toHaveProperty('icon')
        expect(pref).toHaveProperty('checked')
        expect(typeof pref.id).toBe('string')
        expect(typeof pref.label).toBe('string')
        expect(typeof pref.icon).toBe('string')
        expect(typeof pref.checked).toBe('boolean')
      })
    })

    it('all preferences start as unchecked', () => {
      const allPrefs = [
        ...stage1Preferences,
        ...stage2Preferences,
        ...stage3Preferences,
        ...stage4Preferences,
      ]
      allPrefs.forEach((pref) => {
        expect(pref.checked).toBe(false)
      })
    })

    it('preferences have unique IDs', () => {
      const allPrefs = [
        ...stage1Preferences,
        ...stage2Preferences,
        ...stage3Preferences,
        ...stage4Preferences,
      ]
      const ids = allPrefs.map((p) => p.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
  })
})
