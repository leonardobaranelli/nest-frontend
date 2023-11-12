import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Definir un tipo para el objeto de sesión
interface Session {
  user?: {
    rol?: string;
    // ... otras propiedades del usuario
  };
  // ... otras propiedades de la sesión
}

export async function middleware(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Comprobación de nulidad antes de acceder a session.user
    const session: Session | null = token ? (token as Session) : null;

    console.log('Token de sesión:', token);
    console.log('Session:', session);

    // Si el usuario no está autenticado o no es un administrador, redirigir al inicio
    if (!session || !session.user || session.user.rol !== 'admin') {
      console.log('Redirigiendo al inicio');
      const url = new URL('/', req.nextUrl.origin);
      return NextResponse.redirect(url);
    }

    // El usuario está autenticado y es un administrador, continuar con la siguiente respuesta
    console.log('Permitiendo acceso al dashboard');
    return NextResponse.next();
  } catch (error) {
    console.error('Error en el middleware:', error);
    const url = new URL('/', req.nextUrl.origin);
    return NextResponse.redirect(url);
  }
}



// Verifica que la ruta coincida y que el usuario tenga el rol de administrador
export const config = {
  // Verifica que la ruta coincida exactamente y que el usuario tenga el rol de administrador
  matcher: '/dashboard/tables',
};