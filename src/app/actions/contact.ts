'use server';

import { createClient } from '@/lib/supabase/server';
import { contactFormSchema } from '@/lib/validations';

export async function submitContactForm(data: unknown) {
  const result = contactFormSchema.safeParse(data);
  
  if (!result.success) {
    const errors = result.error.issues.map(err => err.message).join(', ');
    return { success: false, error: `Dados inválidos: ${errors}` };
  }

  const { name, email, subject, message, website } = result.data;

  // Honeypot check: if website is filled, it's a bot.
  // We return a silent success to make the bot think it succeeded.
  if (website) {
    return { success: true };
  }

  try {
    const supabase = (await createClient()) as any;
    const { error } = await supabase.from('contact_messages').insert({
      name,
      email,
      subject: subject || null,
      message,
      is_read: false,
    });

    if (error) {
      console.error('Supabase contact insert error:', error);
      return {
        success: false,
        error: 'Não foi possível salvar a mensagem no banco de dados. Tente novamente.',
      };
    }

    return { success: true };
  } catch (err) {
    console.error('Unexpected contact action error:', err);
    return {
      success: false,
      error: 'Ocorreu um erro de rede ou servidor. Tente novamente.',
    };
  }
}
