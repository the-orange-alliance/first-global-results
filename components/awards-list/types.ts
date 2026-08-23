/**
 * Mirrors the award shape the API owns in `api/models/award.ts` — that file is
 * the source of truth; the web app has no import path into it.
 *
 * `countryCode` is an IAC code (FIRST Global), not ISO 3166: HOPE is "10" and
 * the continental teams are "11"-"14".
 */
export interface AwardRecipient {
  /**
   * Absent for an award to an individual who neither represents nor was
   * nominated by a country. Travels as a pair with `countryCode`.
   */
  country?: string;
  countryCode?: string;
  /** The person or organization honoured. Present whenever there is no country. */
  recipientName?: string;
}

/** The medal a recipient placed at. Same vocabulary as the three slots below. */
export type AwardClass = "gold" | "silver" | "bronze";

/**
 * A recipient who placed outside the three slots. `class` puts them on that
 * medal's line anyway — a shared gold, or a medal handed to two teams — and
 * null keeps them on the honorable-mention line.
 */
export interface OtherAwardRecipient extends AwardRecipient {
  class: AwardClass | null;
}

export interface Award {
  name: string;
  description: string;
  eventKey?: string;
  sortOrder?: number;
  /** Null rather than absent when a category went unawarded. */
  gold: AwardRecipient | null;
  silver: AwardRecipient | null;
  bronze: AwardRecipient | null;
  /** Recipients outside the three slots, each with its own class. Always an array. */
  other: OtherAwardRecipient[];
}

/**
 * Competing teams for a season, keyed by normalized IAC code, mapped to the
 * `country` value that season's team documents use.
 *
 * Awards and teams disagree on `country`: awards store a display name
 * ("Poland"), while the teams collection stores whatever the season used —
 * 2017 uses "POL". `countryCode` is the one field both agree on, so it is the
 * join key, and the mapped value carries the team's own `country` for URLs.
 */
export type TeamsByCode = Map<string, string>;

/** Codes are compared case-insensitively and untrimmed data does turn up. */
export const normalizeCode = (code: string | undefined | null) =>
  (code ?? "").trim().toUpperCase();

/** Build the code -> country lookup from a season's ranking rows. */
export const teamsByCodeFrom = (rankings: any[] | undefined): TeamsByCode => {
  const map: TeamsByCode = new Map();

  (rankings || []).forEach((rank) => {
    const team = rank?.team;
    const code = normalizeCode(team?.countryCode);
    if (code && typeof team?.country === "string" && !map.has(code)) {
      map.set(code, team.country);
    }
  });

  return map;
};
