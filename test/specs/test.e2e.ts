import { browser, $, expect } from '@wdio/globals'

describe('Electron Testing', () => {
    it('should print application title', async () => {
        await expect($("h2")).toHaveText('Podcasts')
    })
})

