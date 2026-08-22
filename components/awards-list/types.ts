/**
 * Mirrors the award shape the API owns in `api/models/award.ts` — that file is
 * the source of truth; the web app has no import path into it.
 *
 * `countryCode` is an IAC code (FIRST Global), not ISO 3166: HOPE is "10" and
 * the continental teams are "11"-"14".
 */
export interface AwardRecipient {
  country: string;
  countryCode: string;
  /** Set only for awards given to a specific person or organization. */
  recipientName?: string;
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
  /** Honorable mentions and other non-medal recipients. Always an array. */
  other: AwardRecipient[];
}
