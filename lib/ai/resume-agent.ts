import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { z } from "zod";

// Zod schemas for validation
const JobAnalysisSchema = z.object({
  requiredSkills: z.array(z.string()),
  preferredSkills: z.array(z.string()),
  seniorityLevel: z.enum(['entry', 'mid', 'senior', 'lead', 'executive']),
  companyValues: z.array(z.string()),
  roleType: z.string(),
  industry: z.string(),
  keyResponsibilities: z.array(z.string()),
  qualifications: z.array(z.string())
});

const TailoredContentSchema = z.object({
  selectedExperiences: z.array(z.string()), // experience IDs
  tailoredDescriptions: z.record(z.string()), // experience ID -> tailored description
  suggestedSkillsOrder: z.array(z.string()),
  personalStatementSuggestion: z.string(),
  coverLetterTips: z.array(z.string())
});

export interface Experience {
  id: string;
  title: string;
  organization: string | null;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  public_description: string | null;
  private_notes: string | null;
  category: string | null;
  resume_priority: number;
  skills_developed: string[] | null;
  technologies_used: string[] | null;
  achievements: string[] | null;
}

export interface JobAnalysis {
  requiredSkills: string[];
  preferredSkills: string[];
  seniorityLevel: 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
  companyValues: string[];
  roleType: string;
  industry: string;
  keyResponsibilities: string[];
  qualifications: string[];
}

export interface TailoredContent {
  selectedExperiences: string[];
  tailoredDescriptions: Record<string, string>;
  suggestedSkillsOrder: string[];
  personalStatementSuggestion: string;
  coverLetterTips: string[];
}

export class ResumeAIAgent {
  private llm: ChatOpenAI;
  private analyzer: RunnableSequence<any, any>;
  private generator: RunnableSequence<any, any>;

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY environment variable is required');
    }

    this.llm = new ChatOpenAI({
      modelName: "gpt-4",
      temperature: 0.3,
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.analyzer = this.createAnalyzer();
    this.generator = this.createGenerator();
  }

  private createAnalyzer() {
    const analyzerPrompt = PromptTemplate.fromTemplate(`
      Analyze the following job description and extract key information for resume tailoring:

      Job Description:
      {jobDescription}

      Company: {targetCompany}
      Role: {targetRole}

      Please provide a JSON response with the following structure:
      {{
        "requiredSkills": ["skill1", "skill2", ...],
        "preferredSkills": ["skill1", "skill2", ...],
        "seniorityLevel": "entry|mid|senior|lead|executive",
        "companyValues": ["value1", "value2", ...],
        "roleType": "specific role type",
        "industry": "industry name",
        "keyResponsibilities": ["responsibility1", "responsibility2", ...],
        "qualifications": ["qualification1", "qualification2", ...]
      }}

      Focus on:
      1. Technical skills explicitly mentioned
      2. Soft skills and competencies
      3. Years of experience or seniority indicators
      4. Company culture clues
      5. Key responsibilities that should be highlighted
      6. Educational or certification requirements
    `);

    return analyzerPrompt.pipe(this.llm);
  }

  private createGenerator() {
    const generatorPrompt = PromptTemplate.fromTemplate(`
      Based on the job analysis and available experiences, create tailored resume content:

      Job Analysis:
      {jobAnalysis}

      Available Experiences:
      {experiences}

      Previous Successful Patterns (if any):
      {successfulPatterns}

      Target Company: {targetCompany}
      Target Role: {targetRole}

      Please provide a JSON response with the following structure:
      {{
        "selectedExperiences": ["exp1_id", "exp2_id", ...],
        "tailoredDescriptions": {{
          "exp1_id": "tailored description emphasizing relevant aspects",
          "exp2_id": "tailored description emphasizing relevant aspects"
        }},
        "suggestedSkillsOrder": ["most_relevant_skill", "second_most_relevant", ...],
        "personalStatementSuggestion": "A compelling personal statement tailored to this role",
        "coverLetterTips": ["tip1", "tip2", "tip3"]
      }}

      Guidelines:
      1. Select 3-5 most relevant experiences based on job requirements
      2. Prioritize experiences with higher resume_priority scores
      3. Tailor descriptions to highlight skills and achievements relevant to the job
      4. Order skills by relevance to the job requirements
      5. Create a personal statement that connects background to role
      6. Provide specific cover letter tips for this company/role
    `);

    return generatorPrompt.pipe(this.llm);
  }

  async analyzeJobDescription(
    jobDescription: string,
    targetCompany: string = "",
    targetRole: string = ""
  ): Promise<JobAnalysis> {
    try {
      const result = await this.analyzer.invoke({
        jobDescription,
        targetCompany,
        targetRole
      });

      // Parse the LLM response
      let parsedResult;
      try {
        parsedResult = JSON.parse(result.content);
      } catch (parseError) {
        throw new Error(`Failed to parse LLM response: ${parseError}`);
      }

      // Validate with Zod
      const validatedResult = JobAnalysisSchema.parse(parsedResult);
      return validatedResult;

    } catch (error) {
      console.error('Error analyzing job description:', error);
      throw new Error(`Job analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async generateTailoredResume(params: {
    jobDescription: string;
    targetCompany: string;
    targetRole: string;
    experiences: Experience[];
    successfulPatterns?: any[];
  }): Promise<TailoredContent> {
    try {
      // First analyze the job
      const jobAnalysis = await this.analyzeJobDescription(
        params.jobDescription,
        params.targetCompany,
        params.targetRole
      );

      // Then generate tailored content
      const result = await this.generator.invoke({
        jobAnalysis: JSON.stringify(jobAnalysis),
        experiences: JSON.stringify(params.experiences),
        successfulPatterns: JSON.stringify(params.successfulPatterns || []),
        targetCompany: params.targetCompany,
        targetRole: params.targetRole
      });

      // Parse the LLM response
      let parsedResult;
      try {
        parsedResult = JSON.parse(result.content);
      } catch (parseError) {
        throw new Error(`Failed to parse LLM response: ${parseError}`);
      }

      // Validate with Zod
      const validatedResult = TailoredContentSchema.parse(parsedResult);

      // Archive this pattern for future learning
      await this.archiveSuccessfulPattern({
        jobAnalysis,
        tailoredContent: validatedResult,
        targetCompany: params.targetCompany,
        targetRole: params.targetRole
      });

      return validatedResult;

    } catch (error) {
      console.error('Error generating tailored resume:', error);
      throw new Error(`Resume generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async archiveSuccessfulPattern(data: {
    jobAnalysis: JobAnalysis;
    tailoredContent: TailoredContent;
    targetCompany: string;
    targetRole: string;
  }): Promise<void> {
    try {
      // This would normally save to the database
      // For now, we'll just log it
      console.log('Archiving successful pattern:', {
        company: data.targetCompany,
        role: data.targetRole,
        timestamp: new Date().toISOString()
      });

      // TODO: Implement database storage for ai_patterns table
      // const { error } = await supabase
      //   .from('ai_patterns')
      //   .insert({
      //     job_analysis: data.jobAnalysis,
      //     tailored_content: data.tailoredContent,
      //     target_company: data.targetCompany,
      //     target_role: data.targetRole
      //   });

    } catch (error) {
      console.error('Error archiving pattern:', error);
      // Don't throw here - pattern archiving shouldn't break the main flow
    }
  }

  async getSuccessfulPatterns(filters?: {
    company?: string;
    role?: string;
    industry?: string;
    limit?: number;
  }): Promise<any[]> {
    try {
      // TODO: Implement database retrieval from ai_patterns table
      // This would filter and return successful patterns for learning

      // Mock data for now
      return [];

    } catch (error) {
      console.error('Error retrieving successful patterns:', error);
      return [];
    }
  }

  async provideFeedback(patternId: string, feedback: {
    successRating: number; // 1-10
    userFeedback: string;
    wasHired?: boolean;
    interviewsReceived?: number;
  }): Promise<void> {
    try {
      // TODO: Update the ai_patterns table with feedback
      console.log('Recording feedback for pattern:', patternId, feedback);

    } catch (error) {
      console.error('Error providing feedback:', error);
      throw new Error(`Failed to record feedback: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
