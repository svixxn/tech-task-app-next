import { NextRequest, NextResponse } from "next/server";
import db from "../../../utils/db.server";

function getQuery(status: string, sortOption: string, q: string) {
  let query = {};
  if (status !== "all") {
    query = {
      ...query,
      where: {
        completed: status === "done" ? true : false,
        title: { contains: q || "", mode: "insensitive" },
      },
    };
  } else {
    query = {
      ...query,
      where: { title: { contains: q || "", mode: "insensitive" } },
    };
  }

  if (sortOption !== "0") {
    query = {
      ...query,
      orderBy: { priority: Number(sortOption) === 1 ? "asc" : "desc" },
    };
  } else {
    query = { ...query, orderBy: { createdAt: "desc" } };
  }

  return query;
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);

    const status = url.searchParams.get("status") || "all";
    const sortOption = url.searchParams.get("sort") || "1";
    const q = url.searchParams.get("q") || "";

    const query = getQuery(status, sortOption, q);
    const tasks = await db.task.findMany(query);
    return NextResponse.json(tasks);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { title, priority } = await req.json();

    const task = await db.task.create({ data: { title, priority } });
    return NextResponse.json(task);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}
