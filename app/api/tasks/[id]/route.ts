import db from "@/utils/db.server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const task = await db.task.findUnique({ where: { id } });

    if (!task) return NextResponse.json({ message: "Task not found" });

    const newStatus = !task.completed;

    const updatedTask = await db.task.update({
      where: { id },
      data: { completed: newStatus },
    });

    return NextResponse.json(updatedTask);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await db.task.delete({ where: { id } });
    return NextResponse.json({ message: "Task deleted" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}
