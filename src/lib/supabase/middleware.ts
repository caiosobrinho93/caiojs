import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const isDummy = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("dummy");
  let user: any = null;

  if (isDummy) {
    // In mock mode, we check for a mock_session cookie
    const hasMockSession = request.cookies.has("mock_session");
    if (hasMockSession) {
      user = { id: "mock-user-id", email: "admin@caiosobrinho.com.br" };
    }
  } else {
    try {
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value }) =>
                request.cookies.set(name, value)
              );
              supabaseResponse = NextResponse.next({
                request,
              });
              cookiesToSet.forEach(({ name, value, options }) =>
                supabaseResponse.cookies.set(name, value, options)
              );
            },
          },
        }
      );

      // Refresh session — important for server components
      const {
        data: { user: supabaseUser },
      } = await supabase.auth.getUser();
      user = supabaseUser;
    } catch (err) {
      console.warn("Supabase middleware error (falling back to unauthenticated):", err);
    }
  }

  // Protect admin routes
  const isAdminRoute =
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/admin-projetos") ||
    request.nextUrl.pathname.startsWith("/categorias") ||
    request.nextUrl.pathname.startsWith("/depoimentos") ||
    request.nextUrl.pathname.startsWith("/conteudo") ||
    request.nextUrl.pathname.startsWith("/midia") ||
    request.nextUrl.pathname.startsWith("/analytics");

  if (isAdminRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Redirect logged-in users from login page to dashboard
  if (request.nextUrl.pathname === "/login" && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

