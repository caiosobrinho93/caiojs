'use server';

import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

export async function login(email: string, password: string) {
  const isDummy = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('dummy');

  if (isDummy) {
    // Mock authentication for easy preview in development
    if (email === 'admin@caiosobrinho.com.br' && password === 'admin123') {
      const cookieStore = await cookies();
      cookieStore.set('mock_session', 'active', {
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
      return { success: true };
    } else {
      return {
        success: false,
        error: 'Credenciais inválidas. Para demonstrar use: admin@caiosobrinho.com.br e senha admin123',
      };
    }
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Login Server Action error:', err);
    return {
      success: false,
      error: 'Ocorreu um erro inesperado no servidor de autenticação.',
    };
  }
}

export async function logout() {
  const isDummy = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('dummy');
  const cookieStore = await cookies();

  if (isDummy) {
    cookieStore.delete('mock_session');
    return { success: true };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    return { success: true };
  } catch (err) {
    console.error('Logout Server Action error:', err);
    return {
      success: false,
      error: 'Erro de comunicação ao encerrar sessão.',
    };
  }
}
