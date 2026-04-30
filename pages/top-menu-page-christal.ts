import { test, type Page, type Locator, expect } from '@playwright/test'

export class TopMenuPageChristal {
    // Variables
    /**
     * - Consolidate all relevant elements and links here
     * - Locators are a way to find elements on a web page at any given moment
     * - We use the locator type to indicate that we will be getting elements from the page
     * and assigning them to instance variables
     * - Use name: type to enforce type
     */
    readonly page: Page;
    readonly nodeButton: Locator;
    readonly javaButton: Locator;
    readonly nodeText: Locator;
    readonly javaText: Locator;
    readonly nodeDescription = "Installing Playwright";
    readonly javaDescription = "Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation."

    // Constructor
    /**
     * Instantiates a TopMenuPage object with the given page object
     * @param page object to instantiate with
     */
    constructor(page: Page) {
        this.page = page;
        this.nodeButton = page.getByRole('button', { name: 'Node.js' });
        // Get the 'Java' option from the main navigation bar at the top of the page
        this.javaButton = page.getByRole('navigation', { name: 'Main' }).getByText('Java');
        this.nodeText = page.getByText(this.nodeDescription, { exact: true });
        this.javaText = page.getByText(this.javaDescription);
    }

    // Methods
    /**
     * Do not locate elements here! They should have been located and assigned in the constructor
     * Methods should take the assigned elements and apply actions/assertions to them
     */

    /**
     * Checks that the instance URL matches the given pageUrl
     * @param pageUrl to match the instance URL to
     */
    async assertPageUrl(pageUrl: RegExp) {
        await expect(this.page).toHaveURL(pageUrl);
    }

    /**
     * Hovers over the button named 'Node.js'
     */
    async hoverNode() {
        await this.nodeButton.hover();
    }

    /**
     * Clicks on the 'Java' option in the language dropdown menu
     */
    async clickJava() {
        await this.javaButton.click();
    }

    /**
     * Checks that the Node.js description is not visible after clicking the 'Java' option
     */
    async assertNodeDescriptionNotVisible() {
        await expect(this.nodeText).not.toBeVisible();
    }

    /**
     * Checks that the Java description is visible after clicking the 'Java' option
     */
    async assertJavaDescriptionVisible() {
        await expect(this.javaText).toBeVisible();
    }
}

export default TopMenuPageChristal;