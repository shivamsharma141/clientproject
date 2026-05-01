import { connectDB } from "@/lib/connect";
import Contact from "@/models/Contact";

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, email, message, phone } = body;

    // Validation
    if (!name || !email || !message) {
      return Response.json(
        { success: false, message: "All required fields must be filled" },
        { status: 400 }
      );
    }

    await connectDB();

    const contact = await Contact.create({
      name,
      email,
      message,
      phone,
    });

    return Response.json(
      {
        success: true,
        message: "Message saved successfully",
        data: contact,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}