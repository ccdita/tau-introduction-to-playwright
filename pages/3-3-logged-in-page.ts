import { type Page, type Locator, expect } from '@playwright/test';

export class LoggedInPage {
    readonly page: Page;
    readonly homeLink: Locator;
    readonly practiceLink: Locator;
    readonly coursesLink: Locator;
    readonly blogLink: Locator;
    readonly contactLink: Locator;
    readonly logOutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeLink = this.page.getByRole('link', { name: 'Home', exact: true });
        this.practiceLink = this.page.getByRole('link', { name: 'Practice', exact: true });
        this.coursesLink = this.page.getByRole('link', { name: 'Courses', exact: true });
        this.blogLink = this.page.getByRole('link', { name: 'Blog', exact: true });
        this.contactLink = this.page.getByRole('link', { name: 'Contact', exact: true });
        this.logOutButton = this.page.getByRole('button', { name: 'Log out' });
    }

    /**
     * Clicks the Home link
     */
    async clickHomeLink() {
        await this.homeLink.click();
    }

    /**
     * Clicks the Practice link
     */
    async clickPracticeLink() {
        await this.practiceLink.click();
    }

    /**
     * Clicks the Courses link
     */
    async clickCoursesLink() {
        await this.coursesLink.click();
    }

    /**
     * Clicks the Blog link
     */
    async clickBlogLink() {
        await this.blogLink.click();
    }

    /**
     * Clicks the Contact link
     */
    async clickContactLink() {
        await this.contactLink.click();
    }

    /**
     * Clicks the Log out button
     */
    async clickLogOutButton() {
        await this.logOutButton.click();
    }

    /**
     * Checks that the loaded page's URL matches the given pageUrl
     * @param pageUrl to check the page's URL against
     */
    async assertPageUrl(pageUrl: string) {
        await expect(this.page).toHaveURL(pageUrl);
    }

    /**
     * Asserts that the given page heading is visible on the page
     * @param pageHeading to check for
     */
    async assertPageHeading(pageHeading: string) {
        await expect(this.page.getByRole('heading', { name: pageHeading, exact: true })).toBeVisible();
    }
}