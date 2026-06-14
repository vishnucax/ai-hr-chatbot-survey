# MBA HR Survey — Selenium Automation Test (Eclipse / Maven)

## What it does

This is a **ready-to-run** Java/Selenium test that opens Chrome, automatically fills all 30 fields across 6 steps of the MBA HR Student Survey form, handles the "We Need Your Help!" popup, clicks **Confirm & Submit**, and verifies the **"Survey Completed!"** screen appears.

---

## Pre-requisites

| Requirement | Notes |
|---|---|
| **Java 11+** | JDK must be installed and `JAVA_HOME` set |
| **Maven 3.6+** | Or use Eclipse's built-in Maven (M2E) |
| **Eclipse IDE** | With M2E plugin (included in "Eclipse IDE for Java Developers") |
| **Google Chrome** | Any recent version — ChromeDriver is managed automatically |
| **Survey App Running** | Run `npm run dev` in the `R` project folder first |

---

## Setup in Eclipse (One-Time)

1. Open Eclipse
2. **File → Import → Maven → Existing Maven Projects**
3. Click **Browse...** → navigate to the `selenium-test` folder inside the `R` project
4. Check the `pom.xml` checkbox → click **Finish**
5. Eclipse will automatically download all dependencies (Selenium, JUnit, WebDriverManager) — wait until the progress bar in the bottom-right disappears

---

## Running the Test

1. **Start your survey app first:**
   ```bash
   # In the R project folder
   npm run dev
   ```
   Make sure it is running at `http://localhost:3000`

2. In Eclipse's **Package Explorer**, expand:
   ```
   survey-test
   └── src/test/java
       └── com.letstrainai.survey
           └── SurveyFormTest.java
   ```

3. **Right-click `SurveyFormTest.java` → Run As → JUnit Test**

4. A Chrome browser window opens automatically and fills the form!

---

## To Test on Vercel (Live Site)

Open `SurveyFormTest.java` and change line 55:

```java
// FROM:
private static final String BASE_URL = "http://localhost:3000/survey";

// TO:
private static final String BASE_URL = "https://ai-hr-chatbot-survey.vercel.app/survey";
```

---

## What the Test Covers

| Step | Fields Filled |
|---|---|
| Step 1 – Student Profile | Name, Email, Phone, College, MBA Year (radio), HR Interest (radio) |
| Step 2 – HR Knowledge | Q7, Q8, Q9, Q10, Q11 (textareas) |
| Step 3 – HR Scenarios | Q12, Q13, Q14, Q15, Q16 (textareas) |
| Step 4 – Recruitment & HR | Q17, Q18, Q19 (radio), Q19 Explanation, Q20 |
| Step 5 – AI in HR | Q21 (radio Yes/No), Q22, Q23, Q24, Q25 |
| Step 6 – Chatbot Training Data | Q26, Q27, Q28, Q29, Q30 |
| Popup Modal | Agreement checkbox ✔, Phone Call preference, Confirm & Submit |
| ✅ Assertion | "Survey Completed!" message is displayed |

---

## Project Structure

```
selenium-test/
├── pom.xml                               ← Maven dependencies (Selenium, JUnit 5, WebDriverManager)
├── .project                              ← Eclipse project file
├── .classpath                            ← Eclipse classpath
├── README.md                             ← This file
└── src/
    └── test/
        └── java/
            └── com/
                └── letstrainai/
                    └── survey/
                        └── SurveyFormTest.java   ← The test
```
