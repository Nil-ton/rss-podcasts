import { expect, $, $$, browser } from '@wdio/globals'

describe('Application Colors', () => {
    
    const selectors = {
        pageBody: 'body',
        sidebarContent: 'div[data-test=sidebar-content]',
        rssEmpty: 'p[data-test=rss-empty]',
        sideBarAddButton: 'button[data-test=sidebar-add-button]',
        rssUrlInput: 'input[data-test=rss-url-input]',
        rssSaveButton: 'button[data-test=rss-save-button]',
        podcastContent: 'div[data-test=podcast-content]'
    }

    async function expectBackgroundColor(element:ChainablePromiseElement, expectedColorHex: string) {
        const backgroundColor = await element.getCSSProperty('background-color')
        await expect(backgroundColor.parsed.hex).toBe(expectedColorHex)
    }

    it("should have a black background color (#000000)", async () => {
        const pageBody = $(selectors.pageBody)
        await expectBackgroundColor(pageBody, '#000000')
    })

    it("should have a dark grey background color (#121212) for the sidebar content", async () => {
        const sidebarContents = $$(selectors.sidebarContent)
        await sidebarContents.forEach(async (content) => {
            await expectBackgroundColor(content, '#121212')
        })
    })

    it("should have a background color in Main element", async () => {
        
    })
    
    it("should have a background color when mouse over in card podcast (#2a2a2a)", async () => {
        const rssEmpty = await $(selectors.rssEmpty).isDisplayed()

        if (rssEmpty) {
            const sideBarAddButton = $(selectors.sideBarAddButton)
            await sideBarAddButton.click()

            const rssUrlInput = $(selectors.rssUrlInput)
            await rssUrlInput.setValue('https://api.jovemnerd.com.br/feed-nerdcast/')

            const rssSaveButton = $(selectors.rssSaveButton)
            await rssSaveButton.click()
        }

        const podcastContent = $(selectors.podcastContent)
        await podcastContent.moveTo()

        await browser.pause(2000);

        await podcastContent.getCSSProperty('background-color')
        await expectBackgroundColor(podcastContent, '#2a2a2a')
    })
})
