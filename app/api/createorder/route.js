// app/api/createorder/route.js

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/connect"; // ← tere existing connectDB ka path

// ── Order Schema ──────────────────────────────────────────────────────────────
const orderSchema = new mongoose.Schema(
  {
    customer: {
      fullName: { type: String, required: true, trim: true },
      phone:    { type: String, required: true, trim: true },
      email:    { type: String, trim: true, default: null },
    },
    delivery: {
      address: { type: String, required: true, trim: true },
      city:    { type: String, required: true, trim: true },
      pincode: { type: String, required: true, trim: true },
    },
    items: [
      {
        itemId:   String,
        name:     String,
        price:    Number,
        quantity: Number,
        subtotal: Number,
      },
    ],
    total:         { type: Number, required: true },
    paymentMethod: { type: String, enum: ["UPI", "COD"], default: "UPI" },
    status: {
      type: String,
      enum: ["pending_payment", "confirmed", "processing", "shipped", "delivered", "cancelled"],
      default: "pending_payment",
    },
  },
  { timestamps: true }
);

// prevent model recompilation in dev (hot reload)
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

// ── POST /api/createorder ─────────────────────────────────────────────────────
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    // validate required fields
    const required = ["fullName", "phone", "address", "city", "pincode", "items", "total"];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
      }
    }

    const order = await Order.create({
      customer: {
        fullName: body.fullName.trim(),
        phone:    body.phone.trim(),
        email:    body.email?.trim() || null,
      },
      delivery: {
        address: body.address.trim(),
        city:    body.city.trim(),
        pincode: body.pincode.trim(),
      },
      items: body.items.map((i) => ({
        itemId:   i.itemId,
        name:     i.name,
        price:    Number(i.price),
        quantity: Number(i.quantity),
        subtotal: Number(i.price) * Number(i.quantity),
      })),
      total:         Number(body.total),
      paymentMethod: body.paymentMethod || "UPI",
      status:        body.status || "pending_payment",
    });

    return NextResponse.json(
      {
        success:    true,
        order,
        codSuccess: order.paymentMethod === "COD",
      },
      { status: 201 }
    );

  } catch (err) {
    console.error("[createorder] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}