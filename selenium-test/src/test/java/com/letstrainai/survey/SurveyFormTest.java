package com.letstrainai.survey;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.Duration;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import io.github.bonigarcia.wdm.WebDriverManager;

/**
 * =====================================================================
 *  Selenium Automation Test — MBA HR Student Survey Form
 * =====================================================================
 *
 *  HOW TO RUN IN ECLIPSE:
 *  -----------------------------------------------------------------------
 *  1. Make sure the survey app is running:
 *       - Open a terminal in the "R" project folder
 *       - Run: npm run dev
 *       - The app should be live at http://localhost:3000
 *
 *  2. Import this project into Eclipse:
 *       File → Import → Maven → Existing Maven Projects
 *       → Browse to the "selenium-test" folder → Finish
 *
 *  3. Wait for Eclipse to download all Maven dependencies automatically.
 *
 *  4. Right-click "SurveyFormTest.java" in the Package Explorer.
 *       Run As → JUnit Test
 *
 *  5. A Chrome window will open, fill the entire form automatically,
 *     and assert that the "Survey Completed!" screen appears.
 *
 *  NOTE:
 *  - Chrome browser must be installed.
 *  - WebDriverManager handles ChromeDriver automatically (no manual install).
 *  - To switch to the Vercel deployment, change BASE_URL to the Vercel URL.
 * =====================================================================
 */
public class SurveyFormTest {

    private WebDriver driver;
    private WebDriverWait wait;

    // ▼▼▼ CHANGE THIS URL TO TEST ON VERCEL DEPLOYMENT ▼▼▼
    private static final String BASE_URL = "http://localhost:3000/survey";
    // private static final String BASE_URL = "https://ai-hr-chatbot-survey.vercel.app/survey";

    @BeforeAll
    public static void setupSuite() {
        // Automatically manages ChromeDriver binaries — no manual driver installation needed
        WebDriverManager.chromedriver().setup();
    }

    @BeforeEach
    public void setupTest() {
        ChromeOptions options = new ChromeOptions();
        // Uncomment the next line to run in headless mode (no visible browser window):
        // options.addArguments("--headless=new");
        options.addArguments("--disable-gpu");
        options.addArguments("--window-size=1920,1080");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--disable-extensions");

        driver = new ChromeDriver(options);
        // Maximum wait of 15 seconds for dynamic elements to appear
        wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void testCompleteSurveyWorkflow() {
        System.out.println("==> Navigating to survey URL: " + BASE_URL);
        driver.get(BASE_URL);

        // Clear localStorage to start fresh from Step 1 (bypasses any saved progress)
        try {
            JavascriptExecutor js = (JavascriptExecutor) driver;
            js.executeScript("window.localStorage.clear();");
            driver.navigate().refresh();
            System.out.println("==> localStorage cleared. Waiting for Step 1...");
            wait.until(ExpectedConditions.presenceOfElementLocated(By.name("fullName")));
        } catch (Exception e) {
            System.out.println("WARN: Could not clear localStorage: " + e.getMessage());
        }

        // ─────────────────────────────────────────────────────────────
        // STEP 1: Student Profile
        // ─────────────────────────────────────────────────────────────
        System.out.println("==> Filling Step 1: Student Profile");

        waitAndSendKeys(By.name("fullName"),  "Selenium Test User");
        waitAndSendKeys(By.name("email"),     "selenium@test.com");
        waitAndSendKeys(By.name("phone"),     "+91 9876543210");
        waitAndSendKeys(By.name("college"),   "Eclipse Automation Institute");

        // Click radio buttons using JavaScript for maximum reliability
        clickByJS(By.xpath("//input[@name='mbaYear' and @value='First Year']"));
        clickByJS(By.xpath("//input[@name='hrInterest' and @value='Recruitment & Selection']"));

        clickNextButton();

        // ─────────────────────────────────────────────────────────────
        // STEP 2: HR Knowledge
        // ─────────────────────────────────────────────────────────────
        System.out.println("==> Filling Step 2: HR Knowledge");

        waitAndSendKeys(By.name("q7"),  "Key recruitment steps: Sourcing, Screening, Interviewing, and Onboarding.");
        waitAndSendKeys(By.name("q8"),  "Screen resumes by matching key skills, certifications, and experience with JD.");
        waitAndSendKeys(By.name("q9"),  "Consider relevant experience, skill match, cultural fit, and notice period.");
        waitAndSendKeys(By.name("q10"), "Good qualities: dependability, adaptability, strong communication, and integrity.");
        waitAndSendKeys(By.name("q11"), "Assess cultural fit through behavioral questions and situational analysis.");

        clickNextButton();

        // ─────────────────────────────────────────────────────────────
        // STEP 3: HR Scenarios
        // ─────────────────────────────────────────────────────────────
        System.out.println("==> Filling Step 3: HR Scenarios");

        waitAndSendKeys(By.name("q12"), "Yes, for technical roles where communication can be trained, but no if communication is key.");
        waitAndSendKeys(By.name("q13"), "Decide based on behavioral test results, adaptability, and team compatibility.");
        waitAndSendKeys(By.name("q14"), "First action is to have a 1-on-1 talk to understand the root cause of the performance drop.");
        waitAndSendKeys(By.name("q15"), "Mediate by listening to both sides neutrally and finding common ground.");
        waitAndSendKeys(By.name("q16"), "Explain company policies, offer non-monetary perks, or outline a clear path to promotion.");

        clickNextButton();

        // ─────────────────────────────────────────────────────────────
        // STEP 4: Recruitment & HR
        // ─────────────────────────────────────────────────────────────
        System.out.println("==> Filling Step 4: Recruitment & HR");

        waitAndSendKeys(By.name("q17"), "Mistakes: speaking negatively of past employers, lack of preparation, poor listening.");
        waitAndSendKeys(By.name("q18"), "Evaluate potential by looking at their eagerness to learn and past achievements.");
        clickByJS(By.xpath("//input[@name='q19' and @value='Skills']"));
        waitAndSendKeys(By.name("q19Explanation"), "Skills are concrete and testable, while attitude is subjective but highly critical.");
        waitAndSendKeys(By.name("q20"), "Professionally reject by thanking them, providing soft feedback, and keeping CV on file.");

        clickNextButton();

        // ─────────────────────────────────────────────────────────────
        // STEP 5: AI in HR
        // ─────────────────────────────────────────────────────────────
        System.out.println("==> Filling Step 5: AI in HR");

        clickByJS(By.xpath("//input[@name='q21' and @value='Yes']"));
        waitAndSendKeys(By.name("q22"), "ChatGPT, ATS systems like Greenhouse.");
        waitAndSendKeys(By.name("q23"), "AI can automate resume screening, scheduling, and standard email replies.");
        waitAndSendKeys(By.name("q24"), "Final hiring decisions, dispute resolutions, and personal employee counseling.");
        waitAndSendKeys(By.name("q25"), "ATS parsing, voice call simulation, and legal compliance checks.");

        clickNextButton();

        // ─────────────────────────────────────────────────────────────
        // STEP 6: Chatbot Training Data
        // ─────────────────────────────────────────────────────────────
        System.out.println("==> Filling Step 6: Chatbot Training Data");

        waitAndSendKeys(By.name("q26"), "Prepare by researching the company, practicing common questions, and reviewing the JD.");
        waitAndSendKeys(By.name("q27"), "Keep it clean, highlight achievements, use bullet points, and limit it to 1-2 pages.");
        waitAndSendKeys(By.name("q28"), "HR should investigate, talk to the manager and employee, and facilitate mediation.");
        waitAndSendKeys(By.name("q29"), "Send a polite email thanking them for their time and offering to provide feedback upon request.");
        waitAndSendKeys(By.name("q30"), "Expect introducing the team, signing contracts, and initial training materials.");

        // Click the final "Submit Survey" button to open the Help Modal
        System.out.println("==> Clicking Submit Survey button...");
        clickSubmitSurveyButton();

        // ─────────────────────────────────────────────────────────────
        // MODAL: "We Need Your Help!" Popup
        // ─────────────────────────────────────────────────────────────
        System.out.println("==> Waiting for 'We Need Your Help!' modal...");
        WebElement modalHeader = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("//h3[contains(text(), 'We Need Your Help')]")));
        assertTrue(modalHeader.isDisplayed(), "FAIL: AI Training Help Modal should be displayed.");
        System.out.println("==> Modal appeared. Checking the agreement checkbox...");

        // Check the "Yes, I can help train the AI" checkbox
        clickByJS(By.xpath("//input[@type='checkbox']"));
        System.out.println("==> Checkbox checked. Waiting for preference radio buttons...");

        // Wait for preference options to render (they appear after checking the box)
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@name='helpPref']")));

        // Select "Phone Call" preference
        System.out.println("==> Selecting 'Phone Call' preference...");
        clickByJS(By.xpath("//input[@name='helpPref' and @value='phone']"));

        // The phone number from Step 1 should already be recognized.
        // If the modal shows a "We will contact you at:" confirmation, we skip the phone input.
        // If a standalone phone input appears (no phone was entered in Step 1), fill it.
        By phoneConfirmation = By.xpath("//*[contains(text(), 'We will contact you at:')]");
        By modalPhoneInput   = By.xpath("//label[contains(text(), 'Mobile Number')]/following-sibling::input | //input[@placeholder='+91 9876543210'][ancestor::*[contains(@class,'modal') or contains(@class,'fixed')]]");

        try {
            WebDriverWait shortWait = new WebDriverWait(driver, Duration.ofSeconds(3));
            shortWait.until(ExpectedConditions.visibilityOfElementLocated(phoneConfirmation));
            System.out.println("==> Phone pre-filled message detected. No need to re-enter phone number.");
        } catch (Exception e) {
            // No confirmation text — check if the standalone phone input is shown
            try {
                WebDriverWait shortWait = new WebDriverWait(driver, Duration.ofSeconds(3));
                WebElement phoneField = shortWait.until(ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//label[contains(text(),'Mobile Number')]/following-sibling::input")));
                phoneField.clear();
                phoneField.sendKeys("+91 9876543210");
                System.out.println("==> Phone field filled in modal.");
            } catch (Exception ex) {
                System.out.println("WARN: Could not find phone input in modal: " + ex.getMessage());
            }
        }

        // Click "Confirm & Submit" to finalize the submission
        System.out.println("==> Clicking 'Confirm & Submit' button...");
        By confirmBtnLocator = By.xpath("//button[contains(text(), 'Confirm') or contains(text(), 'Submit')]"
                        + "[not(contains(@form, 'survey-form'))]");
        wait.until(ExpectedConditions.presenceOfElementLocated(confirmBtnLocator));
        clickByJS(confirmBtnLocator);

        // ─────────────────────────────────────────────────────────────
        // VERIFY: Survey Completed! screen
        // ─────────────────────────────────────────────────────────────
        System.out.println("==> Waiting for success screen...");
        WebElement successHeader = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("//h3[contains(text(), 'Survey Completed!')]")));
        assertTrue(successHeader.isDisplayed(), "FAIL: 'Survey Completed!' message should be displayed after submission.");
        System.out.println("==> ✅ TEST PASSED: Survey submitted successfully!");
    }

    // ─────────────────────────────────────────────────────────────────────────
    //  HELPER METHODS
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Waits for an element to be visible, clears it, and types the given text.
     */
    private void waitAndSendKeys(By locator, String text) {
        WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
        element.clear();
        element.sendKeys(text);
    }

    /**
     * Clicks a radio button or checkbox using JavaScript to bypass CSS overlay issues.
     */
    private void clickByJS(By locator) {
        WebElement element = wait.until(ExpectedConditions.presenceOfElementLocated(locator));
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].click();", element);
    }

    /**
     * Clicks the "Next →" navigation button and waits for the next step to load.
     */
    private void clickNextButton() {
        By nextBtnLocator = By.xpath("//button[contains(., 'Next')]");
        wait.until(ExpectedConditions.presenceOfElementLocated(nextBtnLocator));
        clickByJS(nextBtnLocator);
        // Brief pause to allow the step transition animation to complete
        try { Thread.sleep(300); } catch (InterruptedException ignored) {}
    }

    /**
     * Clicks the "Submit Survey" button on the final step.
     */
    private void clickSubmitSurveyButton() {
        By submitBtnLocator = By.xpath("//button[contains(., 'Submit Survey')]");
        wait.until(ExpectedConditions.presenceOfElementLocated(submitBtnLocator));
        clickByJS(submitBtnLocator);
    }
}
