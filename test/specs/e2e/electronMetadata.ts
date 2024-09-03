import { expect, browser } from '@wdio/globals'

describe('Electron Application Metadata', () => {
    it('should display the correct title for the Electron app', async () => {
        const appTitle = await browser.getTitle()
        await expect(appTitle).toBe('RSS Podcasts')
    })
})