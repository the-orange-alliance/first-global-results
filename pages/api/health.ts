import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { NextApiRequest, NextApiResponse } from "next";

type HealthResponse = {
  status: "ok";
  /** Which build is actually serving, so a deploy can be confirmed by eye. */
  buildId: string;
};

/**
 * Next writes .next/BUILD_ID at build time and it never changes for the life of
 * the process, so read it once. A deployed release always carries one; the
 * fallback only covers `next dev`, where .next is assembled lazily.
 */
let buildId: string | undefined;
const getBuildId = () => {
  if (buildId === undefined) {
    try {
      buildId = readFileSync(join(process.cwd(), ".next", "BUILD_ID"), "utf8").trim();
    } catch {
      buildId = "unknown";
    }
  }
  return buildId;
};

/**
 * Liveness probe for the deploy pipeline.
 *
 * Deliberately does not call the results API. A failing response rolls the
 * release back, and rolling back the frontend would do nothing to fix an API
 * outage -- it would just thrash the site over a fault that lives elsewhere.
 * The question this answers is only "is this release serving requests".
 */
export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<HealthResponse>,
) {
  // The probe must reflect the process it hit, not whatever a proxy remembers.
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.status(200).json({ status: "ok", buildId: getBuildId() });
}
