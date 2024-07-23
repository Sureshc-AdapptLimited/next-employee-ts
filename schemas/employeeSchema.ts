import { z } from "zod";

export const EmployeeSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  // last_name: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  point: z
    .number()
    .refine((value) => value % 1 !== 0, { message: "Point must be a decimal" }),

  // point: z
  //   .number()
  //   .min(1, { message: "Point is required" })
  //   .refine(
  //     (value) => {
  //       // Ensure the value has at most two decimal places
  //       return /^\d+(\.\d{1,2})?$/.test(value.toString());
  //     },
  //     {
  //       message: "Point must be a decimal with at most two decimal places",
  //     }
  //   ),
  point_system: z.number().min(1, { message: "System is required" }),
  // remark: z.string().optional(),
  remark: z.string().min(3, { message: "Remark is required" }),
  added_by: z.string().min(1, { message: "Added by is required" }),
});

export type EmployeeType = z.infer<typeof EmployeeSchema>;
