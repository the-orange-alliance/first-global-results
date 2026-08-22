import { getFlagUrl } from "@/lib";

/**
 * Flattened, primitive-only shapes handed to <MatchRow>.
 *
 * Everything the row used to work out mid-render — the station split, the
 * tooltip ternaries, the time label — is resolved once here so the row itself
 * is pure markup and `React.memo` has stable props to compare.
 */
export interface ParticipantVM {
  station: number;
  country: string;
  flagUrl: string;
  tooltip: string;
  struck: boolean;
  underlined: boolean;
  selected: boolean;
}

export interface MatchRowModel {
  key: string;
  label: string;
  played: boolean;
  redWin: boolean;
  blueWin: boolean;
  redScore: number;
  blueScore: number;
  red: ParticipantVM[];
  blue: ParticipantVM[];
  wide: boolean;
  timeLabel: string | null;
  isLive: boolean;
  field: number | null;
}

export interface MatchGroup {
  key: number;
  title: string;
  rows: MatchRowModel[];
}

/** Half of the ±3.5 minute window that counts as "live", in ms. */
const LIVE_WINDOW_MS = 3.5 * 60 * 1000;

// Built lazily so the locale/timezone read happens on the client, where these
// are only ever used.  Formatting the weekday and the clock separately keeps
// the output pinned to moment's old "ddd, HH:mm" regardless of locale.
let dayFormat: Intl.DateTimeFormat | null = null;
let clockFormat: Intl.DateTimeFormat | null = null;

const formatScheduled = (scheduledTime: string, field: number | null) => {
  if (!dayFormat) {
    dayFormat = new Intl.DateTimeFormat(undefined, { weekday: "short" });
    clockFormat = new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }
  const date = new Date(scheduledTime);
  let label = `${dayFormat.format(date)}, ${clockFormat!.format(date)}`;
  if (field) label += `, Field #${field}`;
  return label;
};

const tooltipFor = (p: any): string => {
  if (p.cardStatus === 2) return "Disqualified (Red Card)";
  if (p.noShow === 1) return "No Show";
  if (p.tournamentKey !== "1" && (p.station === 14 || p.station === 24)) {
    return "Did not play this during this match";
  }
  return "";
};

const toParticipant = (p: any, selectedTeamKey?: number): ParticipantVM => ({
  station: p.station,
  country: p.country,
  flagUrl: getFlagUrl(p.countryCode),
  tooltip: tooltipFor(p),
  struck: p.cardStatus === 2,
  underlined:
    p.tournamentKey !== "1" && p.station !== 14 && p.station !== 24,
  selected: selectedTeamKey === p.teamKey,
});

export const matchKey = (m: any) =>
  `${m.eventKey}-${m.tournamentKey}-${m.id}`;

/**
 * Cheap fingerprint of everything the row renders.  Two matches with the same
 * signature produce identical markup, which is what lets `buildGroups` hand
 * back the previous model object and keep `React.memo` from re-rendering.
 */
const signatureOf = (
  m: any,
  timeLabel: string | null,
  isLive: boolean,
  selectedTeamKey?: number
) => {
  let sig = `${m.name}|${m.played ? 1 : 0}|${m.redScore}|${m.blueScore}|${timeLabel ?? ""}|${isLive ? 1 : 0}|${selectedTeamKey ?? ""}`;
  for (const p of m.participants) {
    sig += `|${p.station},${p.teamKey},${p.country},${p.countryCode},${p.cardStatus},${p.noShow},${p.tournamentKey}`;
  }
  return sig;
};

type CacheEntry = { sig: string; model: MatchRowModel };

/**
 * Groups matches by tournament level, newest level first, and turns each match
 * into a `MatchRowModel`.
 *
 * `cache` is a caller-owned Map that survives across renders.  The live page
 * replaces the whole `matches` array every 60s, so without it every poll would
 * hand ~380 rows fresh props and re-render the entire list.  With it, only the
 * rows whose signature actually moved get a new object.
 */
export const buildGroups = (
  matches: any[],
  cache: Map<string, CacheEntry>,
  rawByKey: Map<string, any>,
  now: number | null,
  selectedTeamKey?: number
): MatchGroup[] => {
  const seen = new Set<string>();

  // Copy before sorting: the old in-place sort reordered the caller's
  // data.matches, which TeamModel and the pit display also read.
  const ordered = matches
    .map((m) => ({ m, n: parseInt(m.name.split(" ")[2]) }))
    .sort((a, b) => a.n - b.n)
    .map((x) => x.m);

  const groups = new Map<string, any[]>();
  for (const m of ordered) {
    const bucket = groups.get(m.tournamentKey);
    if (bucket) bucket.push(m);
    else groups.set(m.tournamentKey, [m]);
  }

  const result: MatchGroup[] = [];

  for (const [tournamentKey, groupMatches] of groups) {
    const rows = groupMatches.map((m) => {
      const key = matchKey(m);
      seen.add(key);
      rawByKey.set(key, m);

      const field = m.field ?? null;
      const timeLabel =
        now !== null && m.scheduledTime
          ? formatScheduled(m.scheduledTime, field)
          : null;
      const isLive =
        now !== null &&
        !m.played &&
        !!m.scheduledTime &&
        Math.abs(new Date(m.scheduledTime).getTime() - now) < LIVE_WINDOW_MS;

      const sig = signatureOf(m, timeLabel, isLive, selectedTeamKey);
      const cached = cache.get(key);
      if (cached && cached.sig === sig) return cached.model;

      const model: MatchRowModel = {
        key,
        label: m.name.replace("Qualification", "Ranking"),
        played: m.played,
        redWin: m.redScore > m.blueScore,
        blueWin: m.blueScore > m.redScore,
        redScore: m.redScore,
        blueScore: m.blueScore,
        red: m.participants
          .filter((p: any) => p.station < 20)
          .map((p: any) => toParticipant(p, selectedTeamKey)),
        blue: m.participants
          .filter((p: any) => p.station > 20)
          .map((p: any) => toParticipant(p, selectedTeamKey)),
        wide: m.participants.length > 4,
        timeLabel,
        isLive,
        field,
      };

      cache.set(key, { sig, model });
      return model;
    });

    result.push({
      key: parseInt(tournamentKey.replace("t", "")),
      title: groupMatches[0].name.match(/(.*) Match .*/)[1],
      rows,
    });
  }

  // Drop entries for matches that are no longer in the payload.
  for (const key of cache.keys()) if (!seen.has(key)) cache.delete(key);
  for (const key of rawByKey.keys()) if (!seen.has(key)) rawByKey.delete(key);

  result.sort((a, b) => b.key - a.key);
  return result;
};
