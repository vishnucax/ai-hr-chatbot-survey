/**
 * Google Apps Script for MBA HR Student Survey Form
 * 
 * Instructions:
 * 1. Open your new Google Sheet: https://docs.google.com/spreadsheets/d/1tZZZjnNqjhZ8g7usBy7_13IfUGmdd5U4budQCFJ8YrY/edit
 * 2. Click Extensions -> Apps Script.
 * 3. Delete any existing code, paste this entire file's content, and save.
 * 4. Select "setupSheet" from the dropdown in the toolbar, and click "Run". This will format your sheet beautifully with all headers!
 * 5. Click "Deploy" -> "New deployment" -> Select "Web app".
 * 6. Set "Execute as" to "Me", and "Who has access" to "Anyone".
 * 7. Copy the new Web App URL and paste it into your NEXT_PUBLIC_GOOGLE_SCRIPT_URL in .env.local.
 */

// Headers mapping for the 34 columns
var HEADERS = [
  "Timestamp",
  "Full Name",
  "Email",
  "Phone Number",
  "College",
  "MBA Year",
  "HR Interest",
  "Q7 (Recruitment Steps)",
  "Q8 (Resume Screen)",
  "Q9 (Shortlist Factors)",
  "Q10 (Good Employee Qualities)",
  "Q11 (Assess Cult Fit)",
  "Q12 (Hiring Decision Case)",
  "Q13 (Two Similar Candidates)",
  "Q14 (Performance Drop)",
  "Q15 (Team Conflicts)",
  "Q16 (Salary Hike Request)",
  "Q17 (Interview Mistakes)",
  "Q18 (Evaluate Potential)",
  "Q19 (Experience vs Skills)",
  "Q19 Explanation",
  "Q20 (Reject Candidate)",
  "Q21 (Use AI Tools)",
  "Q22 (AI Tools List)",
  "Q23 (Tasks AI Can Automate)",
  "Q24 (Tasks Keep Human)",
  "Q25 (AI Assistant Features)",
  "Q26 (Reply: Prep Interview)",
  "Q27 (Reply: Create Resume)",
  "Q28 (Reply: Unhappy Manager)",
  "Q29 (Reply: Rejection)",
  "Q30 (Reply: Onboarding)",
  "AI Help Agreed",
  "AI Help Preference"
];

// Technical keys mapping from payload
var KEYS = [
  "timestamp", "fullName", "email", "phone", "college", "mbaYear", "hrInterest",
  "q7", "q8", "q9", "q10", "q11", "q12", "q13", "q14", "q15", "q16",
  "q17", "q18", "q19", "q19Explanation", "q20", "q21", "q22", "q23", 
  "q24", "q25", "q26", "q27", "q28", "q29", "q30", "aiHelpAgreed", "aiHelpPreference"
];

/**
 * Automatically sets up and formats the Google Sheet with premium design guidelines
 */
function setupSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear(); // Clear existing content to design from scratch
  
  // 1. Add Headers
  sheet.appendRow(HEADERS);
  
  // 2. Format Header Row (Row 1)
  var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setFontFamily("Outfit");
  headerRange.setFontSize(11);
  headerRange.setFontWeight("bold");
  headerRange.setFontColor("#ffffff");
  headerRange.setBackground("#581c87"); // Dark Premium Purple matching the AI Chatbot theme
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  
  // 3. Freeze Header Row
  sheet.setFrozenRows(1);
  
  // 4. Set Row Height for Header
  sheet.setRowHeight(1, 40);
  
  // 5. Enable text wrapping for all answers (from column 8 onwards) to keep spreadsheet clean
  var answerRange = sheet.getRange(2, 8, 1000, HEADERS.length - 7);
  answerRange.setWrap(true);
  
  // 6. Autofit column widths
  for (var col = 1; col <= HEADERS.length; col++) {
    sheet.autoResizeColumn(col);
    // Add safety margin for smaller columns
    var currentWidth = sheet.getColumnWidth(col);
    if (currentWidth < 120) {
      sheet.setColumnWidth(col, 130);
    } else if (currentWidth > 300) {
      sheet.setColumnWidth(col, 300); // Caps very long headers to 300px width
    }
  }

  Logger.log("Sheet formatted beautifully with " + HEADERS.length + " columns!");
}

/**
 * Handles incoming POST requests from the survey website.
 * Uses LockService to support heavy concurrent submissions stably for 2+ weeks.
 */
function doPost(e) {
  // Obtain a public script lock to ensure data is appended sequentially (prevents concurrency errors)
  var lock = LockService.getScriptLock();
  
  // Wait up to 30 seconds for lock release
  try {
    lock.waitLock(30000);
  } catch (ex) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Timeout waiting for lock. Try again." }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
  
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Map the payload values to technical keys
    var row = KEYS.map(function(key) {
      return data[key] || "";
    });
    
    // Append the row to the sheet
    sheet.appendRow(row);
    
    // Format the newly added row
    var lastRow = sheet.getLastRow();
    var newRowRange = sheet.getRange(lastRow, 1, 1, HEADERS.length);
    newRowRange.setFontFamily("Outfit");
    newRowRange.setFontSize(10);
    newRowRange.setVerticalAlignment("middle");
    
    // Align columns 1-7, 33, 34 to center
    sheet.getRange(lastRow, 1, 1, 7).setHorizontalAlignment("center");
    sheet.getRange(lastRow, 33, 1, 2).setHorizontalAlignment("center");
    
    // Auto-fit new data rows safely
    sheet.setRowHeight(lastRow, 35);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Data recorded successfully" }))
                         .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  } finally {
    // Release the lock for the next request
    lock.releaseLock();
  }
}
