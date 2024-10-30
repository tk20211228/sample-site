export const dynamic = "force-dynamic"; // static by default, unless reading the request

export function GET(request: Request) {
  const userAgent = request.headers.get("user-agent") || "unknown";
  return new Response(
    `Hello TEST kuboki from ${process.env.VERCEL_REGION}. Your user agent is ${userAgent}`
  );
}
