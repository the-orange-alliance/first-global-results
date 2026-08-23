import { HONORABLE_MENTION, MEDALS } from "./medal-line";
import type { Award, AwardRecipient } from "./types";

export interface AwardLine {
  key: string;
  label: string;
  color: string;
  recipients: AwardRecipient[];
}

const MEDAL_KEYS: string[] = MEDALS.map((medal) => medal.key);

/**
 * The labelled rows an award renders as, in ceremony order, empty ones dropped.
 *
 * A medal line is the slot recipient followed by every `other` entry classed to
 * that medal — the slots hold one recipient each, but a shared gold needs two,
 * and both belong on the same line. Everything left over is an honorable
 * mention.
 *
 * Shared by the awards tab and the team modal so an award reads the same in
 * both places.
 *
 * @param keep optional filter applied to every recipient before bucketing. The
 *   team modal passes it to reduce an award to the lines naming one team.
 */
export const awardLines = (
  award: Award,
  keep: (recipient: AwardRecipient) => boolean = () => true
): AwardLine[] => {
  const other = (award.other ?? []).filter(keep);

  const lines: AwardLine[] = MEDALS.map((medal) => {
    const slot = award[medal.key];
    return {
      ...medal,
      recipients: [
        ...(slot && keep(slot) ? [slot] : []),
        ...other.filter((recipient) => recipient.class === medal.key),
      ],
    };
  });

  // Written as "not a medal" rather than "class is null" so a hand-edited
  // document with an unrecognized class still shows its recipient somewhere.
  lines.push({
    ...HONORABLE_MENTION,
    recipients: other.filter(
      (recipient) => !MEDAL_KEYS.includes(recipient.class as string)
    ),
  });

  return lines.filter((line) => line.recipients.length > 0);
};
