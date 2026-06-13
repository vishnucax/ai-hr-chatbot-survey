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
 * Selenium Automation Test for MBA HR Student Survey Form
 * 
 * Pre-requisites:
 * 1. The React app must be running at http://localhost:3000
 * 2. Chrome browser should be installed.
 */
public class SurveyFormTest {

    private WebDriver driver;
    private WebDriverWait wait;
    private static final String BASE_URL = "http://localhost:3000/survey";

    @BeforeAll
    public static void setupSuite() {
        // Automatically manages ChromeDriver binaries
        WebDriverManager.chromedriver().setup();
    }

    @BeforeEach
    public void setupTest() {
        ChromeOptions options = new ChromeOptions();
        // Uncomment headless mode if running in a CI/CD environment
        // options.addArguments("--headless");
        options.addArguments("--disable-gpu");
        options.addArguments("--window-size=1920,1080");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");

        driver = new ChromeDriver(options);
        // Explicit wait of 10 seconds max for dynamic components
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void testCompleteSurveyWorkflow() {
        driver.get(BASE_URL);

        // Clear local storage and refresh to ensure we start fresh on Step 1 (bypasses step/form persistence)
        try {
            JavascriptExecutor js = (JavascriptExecutor) driver;
            js.executeScript("window.localStorage.clear();");
            driver.navigate().refresh();
            // Wait for the page to load fresh
            wait.until(ExpectedConditions.presenceOfElementLocated(By.name("fullName")));
        } catch (Exception e) {
            System.out.println("Could not clear localStorage: " + e.getMessage());
        }

        // --- STEP 1: Student Profile ---
        waitForElementAndSendKeys(By.name("fullName"), "Selenium Test User");
        waitForElementAndSendKeys(By.name("email"), "selenium@test.com");
        
        // Note: Let's fill the phone on Step 1 to test full completion. 
        // Our script will dynamically skip the modal's phone input if it is pre-filled.
        waitForElementAndSendKeys(By.name("phone"), "+91 9876543210"); 
        
        waitForElementAndSendKeys(By.name("college"), "Eclipse Automation Institute");

        // Click Radios using JavaScript to ensure reliability with CSS frameworks
        clickRadioOrCheckbox(By.xpath("//input[@name='mbaYear' and @value='First Year']"));
        clickRadioOrCheckbox(By.xpath("//input[@name='hrInterest' and @value='Recruitment & Selection']"));

        clickNextButton();

        // --- STEP 2: HR Knowledge ---
        waitForElementAndSendKeys(By.name("q7"), "Key recruitment steps: Sourcing, Screening, Interviewing, and Onboarding.");
        waitForElementAndSendKeys(By.name("q8"), "Screen resumes by matching key skills, certifications, and experience with JD.");
        waitForElementAndSendKeys(By.name("q9"), "Consider relevant experience, skill match, cultural fit, and notice period.");
        waitForElementAndSendKeys(By.name("q10"), "Good qualities: dependability, adaptability, strong communication, and integrity.");
        waitForElementAndSendKeys(By.name("q11"), "Assess cultural fit through behavioral questions and situational analysis.");

        clickNextButton();

        // --- STEP 3: HR Scenarios ---
        waitForElementAndSendKeys(By.name("q12"), "Yes, for technical roles where communication can be trained, but no if communication is key.");
        waitForElementAndSendKeys(By.name("q13"), "Decide based on behavioral test results, adaptability, and team compatibility.");
        waitForElementAndSendKeys(By.name("q14"), "First action is to have a 1-on-1 talk to understand the root cause of the performance drop.");
        waitForElementAndSendKeys(By.name("q15"), "Mediate by listening to both sides neutrally and finding common ground.");
        waitForElementAndSendKeys(By.name("q16"), "Explain company policies, offer non-monetary perks, or outline a clear path to promotion.");

        clickNextButton();

        // --- STEP 4: Recruitment & HR ---
        waitForElementAndSendKeys(By.name("q17"), "Mistakes: speaking negatively of past employers, lack of preparation, poor listening.");
        waitForElementAndSendKeys(By.name("q18"), "Evaluate potential by looking at their eagerness to learn and past achievements.");
        clickRadioOrCheckbox(By.xpath("//input[@name='q19' and @value='Skills']"));
        waitForElementAndSendKeys(By.name("q19Explanation"), "Skills are concrete and can be tested, whereas attitude is subjective but highly critical.");
        waitForElementAndSendKeys(By.name("q20"), "Professionally reject by thanking them, providing soft feedback, and promising to keep CV on file.");

        clickNextButton();

        // --- STEP 5: AI in HR ---
        clickRadioOrCheckbox(By.xpath("//input[@name='q21' and @value='Yes']"));
        waitForElementAndSendKeys(By.name("q22"), "ChatGPT, ATS systems like Greenhouse.");
        waitForElementAndSendKeys(By.name("q23"), "AI can automate resume screening, scheduling, and standard email replies.");
        waitForElementAndSendKeys(By.name("q24"), "Final hiring decisions, dispute resolutions, and personal employee counseling.");
        waitForElementAndSendKeys(By.name("q25"), "ATS parsing, voice call simulation, and legal compliance checks.");

        clickNextButton();

        // --- STEP 6: Chatbot Training Data ---
        waitForElementAndSendKeys(By.name("q26"), "Prepare by researching the company, practicing common questions, and reviewing the JD.");
        waitForElementAndSendKeys(By.name("q27"), "Keep it clean, highlight achievements, use bullet points, and limit it to 1-2 pages.");
        waitForElementAndSendKeys(By.name("q28"), "HR should investigate, talk to the manager and employee, and facilitate mediation.");
        waitForElementAndSendKeys(By.name("q29"), "Send a polite email thanking them for their time and offering to provide feedback upon request.");
        waitForElementAndSendKeys(By.name("q30"), "Expect introducing the team, signing contracts, and initial training materials.");

        // Click the final Submit button to trigger the popup
        clickSubmitButton();

        // --- STEP 7: AI Training Help Modal (Popup) ---
        // Wait for modal to become visible
        WebElement modalHeader = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("//h3[contains(text(), 'We Need Your Help!')]")));
        assertTrue(modalHeader.isDisplayed(), "AI Training Help Modal should be displayed.");

        // Check the mandatory agreement checkbox
        clickRadioOrCheckbox(By.xpath("//input[@type='checkbox']"));

        // Wait for preference options to render and click Phone Call
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@name='helpPref']")));
        clickRadioOrCheckbox(By.xpath("//input[@name='helpPref' and @value='phone']"));

        // Since we have step 1 inputs and localStorage, the phone input in the modal is conditionally displayed.
        // If it shows, fill it. If not, it means the number from Step 1 is pre-selected and visible, which we skip.
        By modalPhoneLocator = By.xpath("//label[contains(text(), 'Mobile Number')]/following-sibling::input");
        try {
            // Wait up to 2 seconds to see if the phone input field is shown
            WebDriverWait shortWait = new WebDriverWait(driver, Duration.ofSeconds(2));
            WebElement modalPhoneInput = shortWait.until(ExpectedConditions.visibilityOfElementLocated(modalPhoneLocator));
            modalPhoneInput.clear();
            modalPhoneInput.sendKeys("+91 9999988888");
        } catch (org.openqa.selenium.TimeoutException e) {
            System.out.println("Phone number input field is not present in modal because it is pre-filled, skipping.");
        }

        // Click "Confirm & Submit" in the modal
        WebElement confirmSubmitBtn = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//button[contains(text(), 'Confirm & Submit')]")));
        confirmSubmitBtn.click();

        // --- STEP 8: Success Verification ---
        WebElement successHeader = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("//h3[contains(text(), 'Survey Completed!')]")));
        assertTrue(successHeader.isDisplayed(), "Success message should be displayed after complete submission.");
    }

    // Helper methods for clean Selenium operations
    private void waitForElementAndSendKeys(By locator, String keys) {
        WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
        element.clear();
        element.sendKeys(keys);
    }

    private void clickRadioOrCheckbox(By locator) {
        WebElement element = wait.until(ExpectedConditions.presenceOfElementLocated(locator));
        // Using JavascriptExecutor ensures the radio/checkbox is clicked regardless of stylesheet overlays
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].click();", element);
    }

    private void clickNextButton() {
        WebElement nextBtn = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//button[contains(., 'Next')]")));
        nextBtn.click();
    }

    private void clickSubmitButton() {
        WebElement submitBtn = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//button[contains(., 'Submit Survey')]")));
        submitBtn.click();
    }
}
