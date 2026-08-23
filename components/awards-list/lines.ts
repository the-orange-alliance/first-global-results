import { HONORABLE_MENTION, MEDALS, RECIPIENTS } from "./medal-line";
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

  // Whether this award placed anybody at all, judged on the whole award rather
  // than on what survived `keep`. In the team modal a team that took only a
  // mention still sees it called one, because the medals it sat below are real
  // even though they belong to other teams.
  const anyMedal =
    MEDALS.some((medal) => award[medal.key]) ||
    (award.other ?? []).some((recipient) =>
      MEDAL_KEYS.includes(recipient.class as string)
    );

  // Written as "not a medal" rather than "class is null" so a hand-edited
  // document with an unrecognized class still shows its recipient somewhere.
  lines.push({
    ...(anyMedal ? HONORABLE_MENTION : RECIPIENTS),
    recipients: other.filter(
      (recipient) => !MEDAL_KEYS.includes(recipient.class as string)
    ),
  });

  return lines.filter((line) => line.recipients.length > 0);
};
