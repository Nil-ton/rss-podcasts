import { expect, $, $$, browser } from '@wdio/globals'

describe('Application Colors', () => {
    
    const selectors = {
        pageBody: 'body',
        sidebarContent: 'div[data-test=sidebar-content]',
        rssEmpty: 'p[data-test=rss-empty]',
        sideBarAddButton: 'button[data-test=sidebar-add-button]',
        rssUrlInput: 'input[data-test=rss-url-input]',
        rssSaveButton: 'button[data-test=rss-save-button]',
        podcastContent: 'div[data-test=podcast-content]',
        MainRoot: 'div[id=grid-in-main]'
    }

    function generateRandomColor(excludeColor:string) {
        function getRandomColor() {
            // Gera uma cor hexadecimal aleatória
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    
        let randomColor:string;
        do {
            randomColor = getRandomColor();
        } while (randomColor.toUpperCase() === excludeColor.toUpperCase());
    
        return randomColor;
    }

    async function expectBackgroundColor(element:ChainablePromiseElement, expectedColorHex: string) {
        const backgroundColor = await element.getCSSProperty('background-color')
        await expect(backgroundColor.parsed.hex).toBe(expectedColorHex)
    }
    async function notExpectBackgroundColor(element:ChainablePromiseElement, notExpectedColorHex: string) {
        const backgroundColor = await element.getCSSProperty('background-color')
        await expect(backgroundColor.parsed.hex).not.toBe(generateRandomColor(notExpectedColorHex))
    }

    it("should not have a black background color (#000000)", async () => {
        const pageBody = $(selectors.pageBody)
        await notExpectBackgroundColor(pageBody, '#000000')
    })

    it("should have a black background color (#000000)", async () => {
        const pageBody = $(selectors.pageBody)
        await expectBackgroundColor(pageBody, '#000000')
    })

    it("should not have a dark grey background color (#121212) for the sidebar content", async () => {
        const sidebarContents = $$(selectors.sidebarContent)
        await sidebarContents.forEach(async (content) => {
            await notExpectBackgroundColor(content, '#121212')
        })
    })
    it("should have a dark grey background color (#121212) for the sidebar content", async () => {
        const sidebarContents = $$(selectors.sidebarContent)
        await sidebarContents.forEach(async (content) => {
            await expectBackgroundColor(content, '#121212')
        })
    })

    it("should not have a background color in Main element", async () => {
        const mainRootElement = $(selectors.MainRoot)

        await notExpectBackgroundColor(mainRootElement, '#121212')
    })

    it("should have a background color in Main element", async () => {
        const mainRootElement = $(selectors.MainRoot)

        await expectBackgroundColor(mainRootElement, '#121212')
    })
    
    it("should not have a background color when mouse over in card podcast (#2a2a2a)", async () => {
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
        await notExpectBackgroundColor(podcastContent, '#2a2a2a')
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

        await podcastContent.getCSSProperty('background-color')
        await expectBackgroundColor(podcastContent, '#2a2a2a')
    })
})
