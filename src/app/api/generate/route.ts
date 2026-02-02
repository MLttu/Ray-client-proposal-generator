import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { ProposalInput } from '@/types/proposal';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are an expert business proposal writer with 20 years of experience helping freelancers and agencies win clients. You write compelling, professional proposals that convert.

Your writing style is:
- Clear and confident, not salesy or pushy
- Professional but warm and personable
- Focused on client benefits and outcomes
- Specific and detailed, avoiding vague promises

When generating proposal sections, always:
- Address the client by name
- Reference their specific project and goals
- Highlight the value and ROI they'll receive
- Use concrete timelines and deliverables
- End with a clear call to action`;

export async function POST(request: NextRequest) {
  try {
    const input: ProposalInput = await request.json();
    
    const prompt = `Generate a professional client proposal based on the following information:

CLIENT INFORMATION:
- Name: ${input.clientName}
- Company: ${input.clientCompany}
- Email: ${input.clientEmail}

PROJECT DETAILS:
- Project Name: ${input.projectName}
- Type: ${input.projectType}
- Description: ${input.projectDescription}

DELIVERABLES:
${input.deliverables.map(d => `- ${d}`).join('\n')}

TIMELINE:
- Duration: ${input.estimatedDuration}
- Start Date: ${input.startDate}

PRICING:
- Type: ${input.pricingType}
- Total: $${input.totalPrice.toLocaleString()}
- Deposit: $${input.depositRequired.toLocaleString()}
- Payment Terms: ${input.paymentTerms}

SENDER:
- Name: ${input.yourName}
- Company: ${input.yourCompany}

Please generate the following sections in JSON format:
{
  "executiveSummary": "A compelling 2-3 paragraph executive summary that hooks the client",
  "scopeOfWork": "Detailed scope of work section (3-4 paragraphs)",
  "deliverablesList": ["Array of specific, detailed deliverables"],
  "timeline": "Timeline section with phases and milestones",
  "investmentSection": "Professional pricing/investment section",
  "termsAndConditions": "Standard terms and conditions",
  "nextSteps": "Clear next steps and call to action"
}

Make the proposal persuasive, professional, and tailored to this specific client and project.`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      system: SYSTEM_PROMPT,
    });

    // Extract the text content
    const textContent = response.content.find(block => block.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text content in response');
    }

    // Parse the JSON from the response
    const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from response');
    }

    const generatedContent = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      success: true,
      proposal: {
        id: crypto.randomUUID(),
        input,
        ...generatedContent,
        createdAt: new Date().toISOString(),
        status: 'draft',
      },
    });
  } catch (error) {
    console.error('Error generating proposal:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate proposal' },
      { status: 500 }
    );
  }
}
