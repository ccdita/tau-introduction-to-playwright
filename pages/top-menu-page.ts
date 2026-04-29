import { expect, Locator, Page } from '@playwright/test';

export class TopMenuPage {
    // Variables
    readonly page: Page;
    readonly getStartedLink: Locator;
    readonly nodeLink: Locator;
    readonly javaLink: Locator;
    readonly nodeLabel: Locator;
    readonly javaLabel: Locator;
    readonly nodeDescription: string = 'Installing Playwright';
    readonly javaDescription: string = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`;

    // Constructor
    constructor(page: Page) {
        this.page = page;
        this.getStartedLink = page.getByRole('link', { name: 'Get started' });
        this.nodeLink = page.getByRole('button', {name: 'Node.js'});
        this.javaLink = page.getByRole('navigation', { name: 'Main' }).getByText('Java');
        this.nodeLabel = page.getByText(this.nodeDescription, {exact:true});
        this.javaLabel = page.getByText(this.javaDescription);
    }

    // Methods
    /**
     * Hovers over the button initially named 'Node.js'
     */
    async hoverNode() {
        await this.nodeLink.hover();
    }
    
    /**
     * Clicks on the 'Java' option in the language dropdown menu
     */
    async clickJava() {
        await this.javaLink.click();
    }

    /**
     * Checks that the page URL matches the given pageUrl
     * @param pageUrl to match the page URL against
     */
    async assertPageUrl(pageUrl: RegExp) {
        await expect(this.page).toHaveURL(pageUrl);
    }

    /**
     * Checks that the Node.js description is not visible
     */
    async assertNodeDescriptionNotVisible() {
        await expect(this.nodeLabel).not.toBeVisible();
    }

    /**
     * Checks that the Java description is visible
     */
    async assertJavaDescriptionVisible() {
        await expect(this.javaLabel).toBeVisible();
    }

}
export default TopMenuPage;