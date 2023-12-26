import { z } from "zod";
import { action } from "@/lib/action";

const formSchema = z.object({
  image: z.string().url(),
  name: z.string().min(3).max(50),
  presentation: z.string().min(10).max(1000),
});

export const editCourse = action(
  formSchema,
  async ({ image, name, presentation }) => {
    return { image, name, presentation };
  }
);
