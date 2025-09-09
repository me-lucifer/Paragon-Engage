'use server';

import { recommendContent } from '@/ai/flows/content-recommendations-flow';
import { z } from 'zod';

const contentLibrary = `
- "Getting Started with Paragon Engage": A beginner's guide to our platform.
- "Advanced SEO Techniques for B2B": An in-depth article on search engine optimization.
- "Email Marketing Best Practices": A comprehensive guide to effective email campaigns.
- "Case Study: How Company X Increased Leads by 50%": A success story.
- "Webinar: The Future of AI in Sales": A recording of our latest webinar.
- "Understanding Your Analytics Dashboard": A tutorial on our reporting features.
`;

const schema = z.object({
  userProfile: z.string().min(10, { message: 'User profile must be at least 10 characters long.' }),
  userBehavior: z.string().min(10, { message: 'User behavior must be at least 10 characters long.' }),
});

export async function handleRecommendContent(prevState: any, formData: FormData) {
  try {
    const validatedFields = schema.safeParse({
      userProfile: formData.get('userProfile'),
      userBehavior: formData.get('userBehavior'),
    });
    
    if (!validatedFields.success) {
      return {
        recommendations: [],
        error: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { userProfile, userBehavior } = validatedFields.data;

    const result = await recommendContent({
      userProfile,
      userBehavior,
      contentLibrary,
    });
    
    return {
      recommendations: result.recommendations,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      recommendations: [],
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}
