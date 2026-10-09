import { useRef } from "react";
import {
  Box,
  Collapse,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

/**
 * Lowercased with diacritics stripped, so "turkiye" finds "Türkiye" and
 * "cote" finds "Côte d'Ivoire".
 */
export const normalizeSearch = (value: unknown): string =>
  (value == null ? "" : String(value))
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();

/**
 * Whether a country-ish record matches an already-normalized query. Names
 * match on substring; the code only matches exactly, otherwise a two-letter
 * query would hit half the field through codes nobody sees on screen.
 *
 * Takes the team's own fields and, separately, any extra display names — 2017
 * stores `country` as "POL", so callers pass the rankings team alongside.
 */
export const countryMatches = (
  query: string,
  record: {
    country?: string;
    name?: string;
    shortName?: string;
    countryCode?: string;
  } | null | undefined
): boolean => {
  if (!record) return false;
  if (normalizeSearch(record.countryCode) === query) return true;
  return [record.country, record.name, record.shortName].some((field) =>
    normalizeSearch(field).includes(query)
  );
};

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  /** Collapse back to the icon when focus leaves an empty field. */
  closeOnEmptyBlur?: boolean;
}

const SearchField = ({
  value,
  onChange,
  onClose,
  closeOnEmptyBlur,
}: SearchFieldProps) => (
  <TextField
    autoFocus
    fullWidth
    size="small"
    placeholder="Search by country"
    value={value}
    onChange={(event) => onChange(event.target.value)}
    onKeyDown={(event) => {
      if (event.key === "Escape") onClose();
    }}
    onBlur={() => {
      if (closeOnEmptyBlur && !value) onClose();
    }}
    slotProps={{
      htmlInput: {
        "aria-label": "Search by country",
        type: "search",
        enterKeyHint: "search",
        autoComplete: "off",
        autoCorrect: "off",
        spellCheck: false,
      },
      input: {
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              size="small"
              edge="end"
              aria-label="Close search"
              // Keep focus in the field so blur doesn't race the click.
              onMouseDown={(event) => event.preventDefault()}
              onClick={onClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      },
    }}
    sx={{
      // iOS zooms the page into any input under 16px; keep phones at 16.
      "& input": { fontSize: { xs: 16, md: "0.875rem" } },
      // The native clear button duplicates ours.
      "& input::-webkit-search-cancel-button": { display: "none" },
    }}
  />
);

interface TabSearchProps {
  open: boolean;
  query: string;
  onQueryChange: (value: string) => void;
  onOpen: () => void;
  onClose: () => void;
  /**
   * Desktop: the field grows out of the icon inside the tab bar. Phones: the
   * tab row has no width to spare, so the icon toggles <TabSearchRow> below
   * it instead.
   */
  inline: boolean;
}

/** The icon (and, on desktop, the expanding field) at the end of the tab bar. */
export const TabSearch = ({
  open,
  query,
  onQueryChange,
  onOpen,
  onClose,
  inline,
}: TabSearchProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const close = () => {
    onClose();
    // Hand focus back to the icon so keyboard users aren't dropped on <body>.
    requestAnimationFrame(() => buttonRef.current?.focus());
  };

  if (inline) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0, pr: 1 }}>
        <Collapse in={open} orientation="horizontal" unmountOnExit>
          <Box sx={{ width: 260, py: 0.5 }}>
            <SearchField
              value={query}
              onChange={onQueryChange}
              onClose={close}
              closeOnEmptyBlur
            />
          </Box>
        </Collapse>
        {!open && (
          <Tooltip title="Search by country">
            <IconButton ref={buttonRef} aria-label="Search by country" onClick={onOpen}>
              <SearchIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ flexShrink: 0, pr: 0.5 }}>
      <IconButton
        ref={buttonRef}
        aria-label={open ? "Close search" : "Search by country"}
        aria-expanded={open}
        aria-controls="tab-search-row"
        onClick={open ? close : onOpen}
        color={query ? "primary" : "default"}
      >
        {open ? <CloseIcon /> : <SearchIcon />}
      </IconButton>
    </Box>
  );
};

/** The phone-width search row that drops in beneath the tab bar. */
export const TabSearchRow = ({
  open,
  query,
  onQueryChange,
  onClose,
}: Pick<TabSearchProps, "open" | "query" | "onQueryChange" | "onClose">) => (
  <Collapse in={open} unmountOnExit id="tab-search-row">
    <Box sx={{ px: 1, py: 1, borderBottom: 1, borderColor: "divider" }}>
      <SearchField value={query} onChange={onQueryChange} onClose={onClose} />
    </Box>
  </Collapse>
);

/** Shown in place of a tab's content when the search filters everything out. */
export const NoSearchResults = ({ query }: { query: string }) => (
  <Box sx={{ py: 5, px: 2, textAlign: "center" }}>
    <Typography variant="body2" sx={{ color: "text.secondary" }}>
      No countries match &ldquo;{query.trim()}&rdquo; on this tab.
    </Typography>
  </Box>
);
