import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { create, useModal, muiDialogV5 } from '@ebay/nice-modal-react';
import FGC2023Breakdown, { lookupKey as FGC2023Lookup } from './seasons/fgc_2023'
import FGC2024Breakdown, { lookupKey as FGC2024Lookup, precalculator as FGC2024Precalculator, coopBreakdown as FGC2024CoopBreakdown } from './seasons/fgc_2024'
import FGC2026Breakdown, { lookupKey as FGC2026Lookup, precalculator as FGC2026Precalculator, coopBreakdown as FGC2026CoopBreakdown } from './seasons/fgc_2026'
import { Divider, Stack, Typography } from '@mui/material';

export const DetailsModal = create((match: any) => {
    const modal = useModal();
    const handleClose = () => {
        modal.resolve(false);
        modal.hide();
    };

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

    if (precalculator) {
        match = precalculator(match);
    }

    const getPointName = (key, value) => {
        if (lookup[key]) {
            return lookup[key][value]
        } else {
            return value
        }
    }

    return (
        <Dialog {...muiDialogV5(modal)} onClose={handleClose} fullWidth maxWidth='sm'>
            <DialogTitle
                sx={{
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: (theme) => theme.palette.common.white,
                    marginBottom: (theme) => theme.spacing(2)
                }}
            >
                {match.name.replaceAll("Qualification", "Ranking")} Breakdown
            </DialogTitle>
            <DialogContentText sx={{ padding: (theme) => theme.spacing(2) }}>
                <Stack sx={{ width: '100%' }}>
                    <Stack direction={"row"} sx={{ justifyContent: 'space-between', width: '100%' }}>
                        <Typography sx={{ color: 'var(--red)' }}>Red</Typography>
                        <Typography><b>Category</b></Typography>
                        <Typography sx={{ color: 'var(--blue)' }}>Blue</Typography>
                    </Stack>
                    <Divider />
                    {Object.keys(breakdown).map((k) => (
                        <Stack key={k} direction={"row"} sx={{ justifyContent: 'space-between', width: '100%' }}>
                            <Typography sx={{ color: 'var(--red)' }}>{getPointName(k, match.details[`red${k}`])}</Typography>
                            <Typography><b>{breakdown[k]}</b></Typography>
                            <Typography sx={{ color: 'var(--blue)' }}>{getPointName(k, match.details[`blue${k}`])}</Typography>
                        </Stack>
                    ))}
                    {coopBreakdown && (
                        <>
                            <Typography sx={{ textAlign: 'center', mt: 2 }}><b>Co-op Goals</b></Typography>
                            <Divider />
                            {Object.keys(coopBreakdown).map((k) => (
                                <Typography key={k} sx={{ textAlign: 'center', width: '100%' }}><b>{coopBreakdown[k]}:</b> {getPointName(k, match.details[k])}</Typography>
                            ))}
                        </>
                    )

                    }
                </Stack>
            </DialogContentText>
            <DialogActions>
                <Button onClick={handleClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
});
