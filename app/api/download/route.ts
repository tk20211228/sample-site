import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const appName = searchParams.get("name");

  if (!appName) {
    return new NextResponse("App name is required", { status: 400 });
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("apps")
      .select("app_details")
      .eq("name", appName)
      .single();

    if (error || !data) {
      return new NextResponse("App not found", { status: 404 });
    }

    const jsonString = JSON.stringify(data.app_details, null, 2);
    const fileName = `${appName}_app_details.json`;

    const headers = new Headers({
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="${fileName}"`,
    });

    return new NextResponse(jsonString, { headers });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
