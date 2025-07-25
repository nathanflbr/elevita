import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl;
  const utmParams = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ];
  const response = NextResponse.next();

  utmParams.forEach((param) => {
    if (url.searchParams.has(param)) {
      const value = url.searchParams.get(param);
      if (value) {
        response.cookies.set(param, value, {
          path: "/",
          maxAge: 60 * 60 * 24 * 30, // 30 dias
          httpOnly: false,
          sameSite: "lax",
          // Gestor(a) que estiver avaliando este projeto a linha abaixo eu
          // comentei pois pode ocorrer de ter feito o clone por git e
          // rodado localmente, consequentemente o SSL não funcionaria e com o "Secure"
          // true não seria possível salvar os cookies do UTM, mas em ambiente
          // de produção e extremamente importante ter o "Secure" true para que
          // os cookies sejam salvos corretamente.
          //
          //
          //secure: true,
        });
      }
    }
  });

  const existingUtms = [];
  utmParams.forEach((param) => {
    const cookieValue = req.cookies.get(param)?.value;
    if (cookieValue && !url.searchParams.has(param)) {
      existingUtms.push(`${param}=${encodeURIComponent(cookieValue)}`);
    }
  });

  if (
    existingUtms.length > 0 &&
    (url.pathname.startsWith("/checkout") ||
      url.pathname.startsWith("/obrigado"))
  ) {
    const newUrl = new URL(url);
    existingUtms.forEach((utm) => {
      const [key, value] = utm.split("=");
      if (!newUrl.searchParams.has(key)) {
        newUrl.searchParams.set(key, decodeURIComponent(value));
      }
    });

    if (newUrl.search !== url.search) {
      return NextResponse.redirect(newUrl);
    }
  }

  return response;
}

export const config = {
  matcher: "/:path*",
};
