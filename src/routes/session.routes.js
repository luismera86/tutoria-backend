import { Router } from "express";

const router = Router();

router.get("/session", (req, res) => {
  return res.json({ ok: true });
});

export default router;n

