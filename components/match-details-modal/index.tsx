import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { create, useModal, muiDialogV5 } from '@ebay/nice-modal-react';
import FGC2023Breakdown, { lookupKey as FGC2023Lookup } from './seasons/fgc_2023'
import FGC2024Breakdown, { lookupKey as FGC2024Lookup, precalculator as FGC2024Precalculator, coopBreakdown as FGC2024CoopBreakdown } from './seasons/fgc_2024'
import FGC2026Breakdown, { lookupKey as FGC2026Lookup, precalculator as FGC2026Precalculator, coopBreakdown as FGC2026CoopBreakdown } from './seasons/fgc_2026'
import { CircularProgress, Divider, Stack, Typography } from '@mui/material';
import { getMatchUrl } from '@/lib';

// Scoring details are about a third of the /v1 payload but are only ever read
// one match at a time, so the pages ask for them to be left out and this modal
// pulls the one it needs.  Cached for the lifetime of the tab: a played
// match's breakdown does not change.
const detailsCache = new Map<string, any>();

const cacheKey = (match: any) =>
    `${match.eventKey}-${match.tournamentKey}-${match.id}`;

const fetchDetails = async (match: any) => {
    const key = cacheKey(match);
    const cached = detailsCache.get(key);
    if (cached) return cached;

    // eventKey looks like "FGC_2025-FGC-CMP".
    const year = match.eventKey.split("-")[0].split("_")[1];
    const res = await fetch(getMatchUrl(year, match.tournamentKey, match.id));
    if (!res.ok) throw new Error(`Match lookup failed (${res.status})`);

    // /v1/matches returns raw documents, and `id` is only unique within a
    // tournament level, so pin down the exact one before reading details.
    const rows = await res.json();
    if (!Array.isArray(rows)) throw new Error("Unexpected match lookup response");
    const row =
        rows.find(
            (r) => r.id === match.id && r.tournamentKey === match.tournamentKey
        ) ?? rows[0];
    if (!row?.details) throw new Error("No breakdown recorded for this match.");

    detailsCache.set(key, row.details);
    return row.details;
};

/**
 * nice-modal's muiDialogV5 helper still emits MUI v5's `TransitionProps`, which
 * v9 replaced with `slotProps.transition`.  Left unmapped it falls through to
 * the DOM (React warns about it) and, worse, its `onExited` never fires — so
 * `remove()` is never called and every dialog that has been opened stays
 * mounted, invisible, for the life of the page.
 */
const dialogProps = (modal: ReturnType<typeof useModal>) => {
    const { TransitionProps, ...rest } = muiDialogV5(modal) as ReturnType<
        typeof muiDialogV5
    > & { TransitionProps?: object };
    return { ...rest, slotProps: { transition: TransitionProps } };
};

export const DetailsModal = create((match: any) => {
    const modal = useModal();
    const handleClose = () => {
        modal.resolve(false);
        modal.hide();
    };

    // Already present when the page was served by an API that has not picked
    // up `excludeMatchDetails` yet, which lets the two deploy in either order.
    const [details, setDetails] = useState<any>(match.details ?? null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (match.details) return;
        let cancelled = false;
        fetchDetails(match)
            .then((d) => { if (!cancelled) setDetails(d); })
            .catch((err) => { if (!cancelled) setError(err.message); });
        return () => { cancelled = true; };
    }, [match]);

    // Lookups map a raw detail value to a label.  Older seasons use arrays
    // (values are 0-based ordinals); 2026 onward use keyed objects because its
    // values are magnitudes (e.g. brace state 0.05/0.1/0.2/0.3).  Indexing
    // works the same for both.
    type Lookup = { [key: string]: string[] | { [value: string]: string } };

    const getBreakdown = (): [{ [key: string]: string }, Lookup, ({ [key: string]: string })?, ((m: any) => any)?] => {
        const seasonKey = match.eventKey.split("-")[0].toLowerCase();
        switch (seasonKey) {
            case 'fgc_2023':
                return [FGC2023Breakdown, FGC2023Lookup];
            case 'fgc_2024':
                return [FGC2024Breakdown, FGC2024Lookup, FGC2024CoopBreakdown, FGC2024Precalculator];
            case 'fgc_2026':
                return [FGC2026Breakdown, FGC2026Lookup, FGC2026CoopBreakdown, FGC2026Precalculator];
            default:
                return [{}, {}]
        }
    }

    const [breakdown, lookup, coopBreakdown, precalculator] = getBreakdown();

    // Precalculators mutate the details they are handed, so give them a copy
    // rather than the object sitting in the cache.
    let scored = details ? { ...match, details: { ...details } } : null;
    if (scored && precalculator) {
        scored = precalculator(scored);
    }

    const getPointName = (key, value) => {
        if (lookup[key]) {
            return lookup[key][value]
        } else {
            return value
        }
    }

    return (
        <Dialog {...dialogProps(modal)} onClose={handleClose} fullWidth maxWidth='sm'>
            <DialogTitle
                sx={{
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: (theme) => theme.palette.common.white,
                    marginBottom: (theme) => theme.spacing(2)
                }}
            >
                {match.name.replaceAll("Qualification", "Ranking")} Breakdown
            </DialogTitle>
            {/* component="div" because the body is Stacks, Typographys and a
                Divider — all block-level, and none of them are legal inside the
                <p> this renders by default. */}
            <DialogContentText component="div" sx={{ padding: (theme) => theme.spacing(2) }}>
                {error ? (
                    <Typography sx={{ textAlign: 'center', color: 'text.secondary' }}>
                        {error}
                    </Typography>
                ) : !scored ? (
                    <Stack sx={{ alignItems: 'center', py: 2 }}>
                        <CircularProgress size={28} />
                    </Stack>
                ) : (
                    <Stack sx={{ width: '100%' }}>
                        <Stack direction={"row"} sx={{ justifyContent: 'space-between', width: '100%' }}>
                            <Typography sx={{ color: 'var(--red)' }}>Red</Typography>
                            <Typography><b>Category</b></Typography>
                            <Typography sx={{ color: 'var(--blue)' }}>Blue</Typography>
                        </Stack>
                        <Divider />
                        {Object.keys(breakdown).map((k) => (
                            <Stack key={k} direction={"row"} sx={{ justifyContent: 'space-between', width: '100%' }}>
                                <Typography sx={{ color: 'var(--red)' }}>{getPointName(k, scored.details[`red${k}`])}</Typography>
                                <Typography><b>{breakdown[k]}</b></Typography>
                                <Typography sx={{ color: 'var(--blue)' }}>{getPointName(k, scored.details[`blue${k}`])}</Typography>
                            </Stack>
                        ))}
                        {coopBreakdown && (
                            <>
                                <Typography sx={{ textAlign: 'center', mt: 2 }}><b>Co-op Goals</b></Typography>
                                <Divider />
                                {Object.keys(coopBreakdown).map((k) => (
                                    <Typography key={k} sx={{ textAlign: 'center', width: '100%' }}><b>{coopBreakdown[k]}:</b> {getPointName(k, scored.details[k])}</Typography>
                                ))}
                            </>
                        )}
                    </Stack>
                )}
            </DialogContentText>
            <DialogActions>
                <Button onClick={handleClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
});
