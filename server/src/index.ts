import express, { Request, Response } from "express";
import { userSchema } from "./schemas/user";

const app = express();
const port = 4000;

app.use(express.json());

app.post("/user", (req: Request, res: Response) => {
  try {
    // Validate request body using Zod
    const parsedData = userSchema.parse(req.body);

    // If validation passes
    res.status(200).json({ message: "User data is valid", data: parsedData });
  } catch (error: any) {
    // If validation fails
    res
      .status(400)
      .json({ message: "Invalid user data", error: error.errors as any });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
