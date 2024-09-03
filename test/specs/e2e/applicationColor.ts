import { expect, $ } from '@wdio/globals'

describe('Application Colors', () => {
    it("should have a black background color (#000000)", async () => {
        const pageBody = $('body')
        const backgroundColor = await pageBody.getCSSProperty('background-color')
        
        await expect(backgroundColor.parsed.hex).toBe('#000000')
    })

    it("should have a dark grey background color (#121212) for the sidebar content", async () => {
        const sidebarContent = await $$('div[data-test=sidebar-content]').getElements()

        for(let i = 0; i < sidebarContent.length; i++) {
            const backgroundColor = await sidebarContent[i].getCSSProperty('background-color')
            await expect(backgroundColor.parsed.hex).toBe('#121212')
        }
    })
})