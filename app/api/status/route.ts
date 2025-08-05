import { NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

export async function GET() {
  // Check if the required environment variables exist
  const hasRequiredEnvVars = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN

  if (!hasRequiredEnvVars) {
    return NextResponse.json({
      status: "disconnected",
      demoMode: true,
    })
  }

  try {
    // Create Redis client using Vercel KV environment variables
    const redis = new Redis({
      url: process.env.KV_REST_API_URL || "",
      token: process.env.KV_REST_API_TOKEN || "",
    })

    // Try to connect to Upstash Redis
    await redis.ping()

    return NextResponse.json({
      status: "connected",
      demoMode: false,
    })
  } catch (error) {
    return NextResponse.json({
      status: "disconnected",
      demoMode: true,
    })
  }
}
