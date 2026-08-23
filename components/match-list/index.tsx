import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import NiceModal from "@ebay/nice-modal-react";
import { DetailsModal } from "../match-details-modal";
import MatchRow from "./row";
import { buildGroups } from "./model";
import type { MatchRowModel } from "./model";
import styles from "./match-list.module.css";

interface MatchListProps {
  matches: any[];
  type?: "column" | "responsive";
  align?: "start" | "center";
  selectedTeamKey?: number;
}

/** How often the "Watch Live" window is re-evaluated. */
const TICK_MS = 30 * 1000;

const MatchList: React.FC<MatchListProps> = ({
  matches,
  align = "center",
  type = "responsive",
  selectedTeamKey,
}) => {
  // Row models are cached by match key across renders so that the live page's
  // 60s refetch, which replaces the whole matches array, doesn't invalidate
  // every row's props.  See buildGroups.
  //
  // Held in state rather than a ref so they can be read during render: this is
  // a pure cache, so the same inputs still produce the same output.
  const [cache] = useState(() => new Map<string, any>());
  const [rawByKey] = useState(() => new Map<string, any>());

  // Null until mounted: times are formatted in the viewer's timezone, so
  // computing them during SSR would both be wrong and risk a hydration
  // mismatch.  Rows show "TBD" for the first paint, as they always have.
  const [now, setNow] = useState<number | null>(null);

  const groups = useMemo(
    () =>
      buildGroups(matches, cache, rawByKey, now, selectedTeamKey),
    [matches, now, selectedTeamKey, cache, rawByKey]
  );

  const hasUnplayed = useMemo(() => matches.some((m) => !m.played), [matches]);

  // One timer for the whole list.  This used to be a setInterval per unplayed
  // match, which meant 300+ concurrent timers each firing its own setState
  // during a live event.
  useEffect(() => {
    setNow(Date.now());
    if (!hasUnplayed) return;
    const interval = setInterval(() => setNow(Date.now()), TICK_MS);
    return () => clearInterval(interval);
  }, [hasUnplayed]);

  // NiceModal's standalone show() dispatches straight to its store. useModal()
  // would subscribe this component to the modal context instead, so every open
  // and close re-rendered all ~380 rows.
  const openDetails = useCallback((key: string) => {
    const match = rawByKey.get(key);
    if (match?.played) NiceModal.show(DetailsModal, match);
  }, [rawByKey]);

  return (
    <Stack
      direction="column"
      spacing={0.25}
      className={
        type === "column" ? `${styles.list} ${styles.column}` : styles.list
      }
      sx={{
        alignItems: align === "center" ? "center" : "flex-start"
      }}
    >
      {groups.map((level) => (
        <React.Fragment key={level.key}>
          <Stack
            direction="column"
            spacing={0.25}
            sx={{
              alignItems: "stretch",
              mb: level.key > 1 ? undefined : 2
            }}>
            <Stack
              direction="row"
              sx={{
                justifyContent: "center",
                alignItems: "center",
                py: 0.75,
                bgcolor: "action.hover"
              }}>
              <Box
                sx={{
                  bgcolor: "background.paper",
                  border: 1,
                  borderColor: "divider",
                  py: 0.675,
                  px: 1.75,
                  borderRadius: 4,
                  fontSize: "0.875rem",
                  fontWeight: 500
                }}>
                {level.title} Matches
              </Box>
            </Stack>
            <div className={styles.rows}>
              {level.rows.map((row: MatchRowModel) => (
                <MatchRow
                  key={row.key}
                  model={row}
                  onOpenDetails={openDetails}
                />
              ))}
            </div>
          </Stack>

          {level.key > 1 && (
            <Typography variant="caption" sx={{
              mb: 2
            }}>
              <u>Underline</u> shows teams who played during the match
            </Typography>
          )}
        </React.Fragment>
      ))}
    </Stack>
  );
};

export default MatchList;
