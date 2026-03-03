import { z } from "zod";

/* ---------------- Luhn Check ---------------- */
const isValidCardNumber = (cardNumber: string) => {
  const cleaned = cardNumber.replace(/\s+/g, "");
  if (!/^\d{16}$/.test(cleaned)) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};

/* ---------------- Expiry Check ---------------- */
const isValidExpiry = (value: string) => {
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) return false;

  const [month, year] = value.split("/").map((v) => parseInt(v, 10));
  const now = new Date();
  const expiry = new Date(2000 + year, month - 1, 1); // first day of expiry month
  const endOfMonth = new Date(expiry.getFullYear(), expiry.getMonth() + 1, 0); // last day of expiry month
  return endOfMonth >= now;
};

/* ---------------- Checkout Schema ---------------- */
export const checkoutFormSchema = z
  .object({
    /* Shipping Fields */
    details: z
      .string()
      .trim()
      .min(1, "Street address is required.")
      .min(10, "Address must be at least 10 characters long.")
      .max(200, "Address cannot exceed 200 characters."),

    phone: z
      .string()
      .trim()
      .min(1, "Phone number is required.")
      .regex(/^(\+2)?01[0125][0-9]{8}$/, "Please enter a valid Egyptian mobile number."),

    city: z
      .string()
      .trim()
      .min(1, "City name is required.")
      .min(2, "City must be at least 2 characters long.")
      .max(50, "City cannot exceed 50 characters."),

    /* Payment Method */
    paymentMethod: z.enum(["cash", "card"]),

    /* Card Fields (optional if paymentMethod is cash) */
    cardNumber: z.string().optional(),
    expiryDate: z.string().optional(),
    cvc: z.string().optional(),
    cardHolder: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod === "card") {
      // Card Number validation
      if (!data.cardNumber || !isValidCardNumber(data.cardNumber)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["cardNumber"],
          message: "Invalid card number (16 digits, must pass Luhn check)",
        });
      }

      // Expiry Date validation
      if (!data.expiryDate || !isValidExpiry(data.expiryDate)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["expiryDate"],
          message: "Invalid or expired expiry date (MM/YY)",
        });
      }

      // CVC validation
      if (!data.cvc || !/^\d{3,4}$/.test(data.cvc)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["cvc"],
          message: "Invalid CVC (3 or 4 digits)",
        });
      }

      // Cardholder Name validation
      if (!data.cardHolder || data.cardHolder.trim().length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["cardHolder"],
          message: "Cardholder name is required (min 3 characters)",
        });
      }
    }
  });

export type CheckoutFormTypes = z.infer<typeof checkoutFormSchema>;