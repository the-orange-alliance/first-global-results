import React, { memo } from "react";
import NextLink from "next/link";
import { Tooltip } from "@mui/material";
import { useTeamLink } from "@/components/team-link";
import { watchLinks } from "@/lib/data";
import type { MatchRowModel, ParticipantVM } from "./model";
import styles from "./match-list.module.css";

/**
 * One match, as plain DOM.
 *
 * Deliberately free of MUI apart from the rare <Tooltip>: this renders ~380
 * times, and the MUI/Emotion version cost ~33 styled components per row.  All
 * styling lives in match-list.module.css; see model.ts for how the props are
 * kept referentially stable so the memo below actually bites.
 */

const cx = (...names: (string | false | undefined)[]) =>
  names.filter(Boolean).join(" ");

type TeamLink = ReturnType<typeof useTeamLink>;

const Participant: React.FC<{
  p: ParticipantVM;
  winner: boolean;
  teamLink: TeamLink;
}> = ({ p, winner, teamLink }) => {
  const label = (
    <span className={p.struck ? styles.struck : undefined}>{p.country}</span>
  );

  return (
    <div
      className={cx(
        styles.team,
        winner && styles.winner,
        p.underlined && styles.underline,
        p.selected && styles.selected
      )}
    >
      {/* Deliberately not next/image: these are 16x12 SVGs, which the image
          optimizer passes through untouched anyway, and there are ~2,300 of
          them on the page. A plain tag skips that component's per-instance
          srcset work. They already get a one-year Cache-Control from
          next.config.js. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.flag}
        src={p.flagUrl}
        width={16}
        height={12}
        loading="lazy"
        decoding="async"
        /* Decorative: the country code sits right next to it. */
        alt=""
      />
      <NextLink
        {...teamLink(p.country)}
        prefetch={false}
        shallow
        className={styles.teamLink}
      >
        {/* Only ~1% of participants have anything to say, and a Tooltip is one
            of MUI's heaviest primitives, so the rest get a bare span. */}
        {p.tooltip ? (
          <Tooltip title={p.tooltip} placement="top" arrow>
            {label}
          </Tooltip>
        ) : (
          label
        )}
      </NextLink>
    </div>
  );
};

const Alliance: React.FC<{
  alliance: "red" | "blue";
  participants: ParticipantVM[];
  winner: boolean;
  teamLink: TeamLink;
}> = ({ alliance, participants, winner, teamLink }) => (
  <div
    className={cx(
      styles.alliance,
      alliance === "red" ? styles.allianceRed : styles.allianceBlue
    )}
  >
    {participants.map((p) => (
      <Participant key={p.station} p={p} winner={winner} teamLink={teamLink} />
    ))}
  </div>
);

interface MatchRowProps {
  model: MatchRowModel;
  onOpenDetails: (key: string) => void;
}

const MatchRow: React.FC<MatchRowProps> = ({ model, onOpenDetails }) => {
  const teamLink = useTeamLink();

  const nameClass = model.played
    ? model.redWin
      ? styles.redWin
      : model.blueWin
        ? styles.blueWin
        : styles.tie
    : undefined;

  return (
    <div className={cx(styles.row, model.wide && styles.wide)}>
      <div
        onClick={() => onOpenDetails(model.key)}
        title={model.played ? "View match breakdown" : undefined}
        className={cx(styles.name, model.played && styles.played, nameClass)}
      >
        {model.label}
      </div>

      <div className={styles.teams}>
        <div className={styles.alliances}>
          <Alliance
            alliance="red"
            participants={model.red}
            winner={model.redWin}
            teamLink={teamLink}
          />
          <Alliance
            alliance="blue"
            participants={model.blue}
            winner={model.blueWin}
            teamLink={teamLink}
          />
        </div>
      </div>

      {model.played ? (
        <div className={styles.scores}>
          <div
            className={cx(
              styles.score,
              styles.redScore,
              model.redWin && styles.winner
            )}
          >
            {model.redScore}
          </div>
          <div
            className={cx(
              styles.score,
              styles.blueScore,
              model.blueWin && styles.winner
            )}
          >
            {model.blueScore}
          </div>
        </div>
      ) : (
        <div className={cx(styles.time, model.isLive && styles.live)}>
          {model.isLive ? (
            <a
              className={styles.watchLink}
              href={watchLinks["field" + model.field] || watchLinks.main}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch Live
            </a>
          ) : (
            model.timeLabel || "TBD"
          )}
        </div>
      )}
    </div>
  );
};

export default memo(MatchRow);
