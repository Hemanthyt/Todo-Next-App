import { connectDB } from "@/lib/config/db";
import TodoModel from "@/lib/model/TodoModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
  await connectDB();
};
LoadDB();

export async function GET(request) {
  const todos = await TodoModel.find({});
  return NextResponse.json({ todos: todos });
}
export async function POST(request) {
  const { title, description } = await request.json();
  await TodoModel.create({
    title,
    description,
  });
  return NextResponse.json({ message: "Todo Created" });
}

export async function DELETE(request) {
  const mongoId = await request.nextUrl.searchParams.get("mongoId");
  await TodoModel.findByIdAndDelete(mongoId);
  return NextResponse.json({ message: "Todo Deleted" });
}

export async function PUT(request) {
  const mongoId = await request.nextUrl.searchParams.get("mongoId");
  await TodoModel.findByIdAndUpdate(mongoId, {
    $set: { isCompleted: true },
  });
  return NextResponse.json({ message: "Todo Updated" });
}
