import { HONORABLE_MENTION, MEDALS } from "./medal-line";
import { normalizeCode, type Award, type AwardRecipient } from "./types";

export interface AwardLine {
  key: string;
  label: string;
  color: string;
  recipients: AwardRecipient[];
}

export interface TeamAward {
  award: Award;
  /** Only the lines naming this team, in ceremony order. */
  lines: AwardLine[];
}

/**
 * The awards a team appears in, reduced to the lines that name it.
 *
 * Matched on IAC `countryCode`, not on `country`: the awards collection stores
 * a display name ("Poland") while the teams collection stores whatever the
 * season used — 2017 stores "POL" — so the two names never meet.
 *
 * A team can hold more than one slot in a single award — an honorable mention
 * alongside a medal, or two individuals from the same country — so `lines` is
 * an array rather than a single hit.
 */
export const teamAwards = (
  awards: Award[] | undefined,
  countryCode: string | undefined
): TeamAward[] => {
  const code = normalizeCode(countryCode);
  if (!awards?.length || !code) {
    return [];
  }

  const isTeam = (recipient: AwardRecipient | null | undefined) =>
    !!recipient && normalizeCode(recipient.countryCode) === code;

  return awards
    .map((award) => {
      const lines: AwardLine[] = [];

      MEDALS.forEach((medal) => {
        const recipient = award[medal.key];
        if (isTeam(recipient)) {
          lines.push({ ...medal, recipients: [recipient as AwardRecipient] });
        }
      });

      const mentions = (award.other ?? []).filter(isTeam);
      if (mentions.length > 0) {
        lines.push({ ...HONORABLE_MENTION, recipients: mentions });
      }

      return { award, lines };
    })
    .filter((entry) => entry.lines.length > 0);
};
