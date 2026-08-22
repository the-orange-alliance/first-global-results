import { HONORABLE_MENTION, MEDALS } from "./medal-line";
import type { Award, AwardRecipient } from "./types";

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
 * The awards a country appears in, reduced to the lines that name it.
 *
 * A country can hold more than one slot in a single award — an honorable
 * mention alongside a medal, or two individuals from the same country — so
 * `lines` is an array rather than a single hit.
 */
export const teamAwards = (
  awards: Award[] | undefined,
  country: string | undefined
): TeamAward[] => {
  if (!awards?.length || !country) {
    return [];
  }

  return awards
    .map((award) => {
      const lines: AwardLine[] = [];

      MEDALS.forEach((medal) => {
        const recipient = award[medal.key];
        if (recipient?.country === country) {
          lines.push({ ...medal, recipients: [recipient] });
        }
      });

      const mentions = (award.other ?? []).filter(
        (recipient) => recipient.country === country
      );
      if (mentions.length > 0) {
        lines.push({ ...HONORABLE_MENTION, recipients: mentions });
      }

      return { award, lines };
    })
    .filter((entry) => entry.lines.length > 0);
};
