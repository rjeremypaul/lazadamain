"use server";

import { formSchema } from "@/app/admin/_components/login-form";
import db from "@/lib/db";
import { z } from "zod";
import * as jose from "jose";
import { cookies } from "next/headers";

export const createAdmin = async (data: {
  name: string;
  username: string;
  password: string;
}) => {
  if (!data.name || !data.username || !data.password) {
    return { error: "All fields are required" };
  }
  try {
    await db.admin.create({
      data: {
        name: data.name,
        username: data.username,
        password: data.password,
      },
    });

    return { success: "Admin created successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create admin" };
  }
};

export const updateAdmin = async (
  data: { name: string; username: string; password: string },
  id: string
) => {
  if (!data.name || !data.username || !data.password) {
    return { error: "All fields are required" };
  }

  try {
    await db.admin.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        username: data.username,
        password: data.password,
      },
    });

    return { success: "Admin updated successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update admin" };
  }
};

export const deleteAdmin = async (id: string) => {
  if (!id) {
    return { error: "ID is required" };
  }

  try {
    await db.admin.delete({
      where: {
        id: id,
      },
    });

    return { success: "Admin deleted successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete admin" };
  }
};

export const loginAdmin = async (values: z.infer<typeof formSchema>) => {
  try {
    const response = await db.admin.findUnique({
      where: {
        username: values.username,
      },
    });

    if (!response) {
      return { error: "User not found" };
    }

    if (response.password !== values.password) {
      return { error: "Invalid password" };
    }

    // Create JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";

    const jwt = await new jose.SignJWT({})
      .setProtectedHeader({ alg })
      .setExpirationTime("72h")
      .setSubject(response.id.toString())
      .sign(secret);

    (
      await // Set the cookie with the JWT
      cookies()
    ).set("Authorization", jwt, {
      httpOnly: true, // Set to true for security
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 60 * 60 * 24 * 3, // Cookie expiration (3 days in seconds)
      sameSite: "strict", // Adjust according to your needs
      path: "/", // Adjust path as needed
    });

    return { token: jwt };
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  (await cookies()).set("Authorization", "", { maxAge: 0, path: "/" });
};
