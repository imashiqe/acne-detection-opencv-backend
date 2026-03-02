const express = require("express");
const multer = require("multer");
const path = require("path");
const prisma = require("../lib/prisma");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Upload & analyze
router.post("/", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const imgPath = req.file.path.replace(/\\/g, "/");

  // Call your Python detection script
  const { exec } = require("child_process");
  exec(`python detect.py ${imgPath}`, async (err, stdout) => {
    if (err) return res.status(500).json({ error: err.message });

    const result = JSON.parse(stdout);

    // Save to database
    const saved = await prisma.scan.create({
      data: {
        imagePath: imgPath,
        spots: result.spots,
        severity: result.severity,
      },
    });

    res.json(saved);
  });
});

// History endpoint
router.get("/history", async (req, res) => {
  const scans = await prisma.scan.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Convert Windows backslashes to URL paths
  const scansWithUrl = scans.map((scan) => ({
    ...scan,
    imagePath: scan.imagePath.replace(/\\/g, "/"),
  }));

  res.json(scansWithUrl);
});

module.exports = router;
