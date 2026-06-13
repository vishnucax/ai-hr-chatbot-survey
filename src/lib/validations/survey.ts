import { z } from "zod";

export const surveySchema = z.object({
  // Section 1: Student Profile
  fullName: z.string().min(2, "Full Name is required").max(100),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  phone: z.string().min(10, "Please enter a valid phone number").max(15).optional().or(z.literal("")),
  college: z.string().min(2, "College / University is required"),
  mbaYear: z.enum(["First Year", "Second Year"], {
    message: "Please select your MBA Year",
  }),
  hrInterest: z.enum(
    [
      "Recruitment & Selection",
      "Training & Development",
      "Compensation & Benefits",
      "Performance Management",
      "Employee Relations",
      "HR Analytics",
    ],
    {
      message: "Please select an HR Area of Interest",
    }
  ),

  // Section 2: HR Knowledge
  q7: z.string().min(10, "Please provide the key steps in a recruitment process"),
  q8: z.string().min(10, "Please explain how you would screen a resume"),
  q9: z.string().min(10, "Please list the factors for shortlisting a candidate"),
  q10: z.string().min(10, "Please describe the qualities of a good employee"),
  q11: z.string().min(10, "Please explain how you assess cultural fit"),

  // Section 3: HR Scenarios
  q12: z.string().min(10, "Please explain your hiring decision and reasoning"),
  q13: z.string().min(10, "Please explain how you would decide between the two candidates"),
  q14: z.string().min(10, "Please describe your first action regarding the performance drop"),
  q15: z.string().min(10, "Please explain how you would handle team conflicts"),
  q16: z.string().min(10, "Please describe your response to the salary hike request"),

  // Section 4: Recruitment & HR
  q17: z.string().min(10, "Please list common interview mistakes"),
  q18: z.string().min(10, "Please explain how you evaluate candidate potential"),
  q19: z.enum(["Experience", "Skills", "Attitude"], {
    message: "Please select what you think is more important",
  }),
  q19Explanation: z.string().min(10, "Please explain your choice"),
  q20: z.string().min(10, "Please provide an example of a professional rejection"),

  // Section 5: AI in HR
  q21: z.enum(["Yes", "No"], {
    message: "Please indicate if you use AI tools",
  }),
  q22: z.string().min(2, "Please list the AI tools you have used (or type 'None')"),
  q23: z.string().min(10, "Please list HR tasks AI can automate"),
  q24: z.string().min(10, "Please list HR tasks that should remain human-driven"),
  q25: z.string().min(10, "Please describe features you'd like in an AI HR Assistant"),

  // Section 6: Chatbot Training Data
  q26: z.string().min(10, "Please provide your response to the student"),
  q27: z.string().min(10, "Please provide your response to the fresher"),
  q28: z.string().min(10, "Please explain what HR should do"),
  q29: z.string().min(10, "Please provide your response to the rejected candidate"),
  q30: z.string().min(10, "Please provide your response regarding onboarding"),
});

export type SurveyFormData = z.infer<typeof surveySchema>;
