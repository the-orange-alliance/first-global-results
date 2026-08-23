import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import SettingsBrightnessOutlined from "@mui/icons-material/SettingsBrightnessOutlined";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { useEffect, useState } from "react";

type Mode = "light" | "dark" | "system";

const options: { mode: Mode; label: string; Icon: typeof LightModeOutlined }[] =
  [
    { mode: "light", label: "Light", Icon: LightModeOutlined },
    { mode: "dark", label: "Dark", Icon: DarkModeOutlined },
    { mode: "system", label: "System", Icon: SettingsBrightnessOutlined },
  ];

/**
 * Light / Dark / System picker for the nav bar.
 *
 * "System" is the default, and it is a real third state rather than the
 * absence of a choice: once someone picks Light or Dark that wins, and picking
 * System again hands control back to the OS.  MUI persists the selection under
 * the `mui-mode` localStorage key; pages/_document.tsx replays it before the
 * first paint.
 */
const ThemeModeSelect = () => {
  const { mode, setMode } = useColorScheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // `mode` is undefined during SSR and the hydration render — it can only be
  // known once localStorage and matchMedia are readable.  Rendering the real
  // icon before then would be a hydration mismatch, so the button is present
  // but blank (keeping the nav from reflowing) until after mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const selected = options.find((option) => option.mode === mode);
  const CurrentIcon = selected?.Icon ?? SettingsBrightnessOutlined;

  return (
    <>
      <Tooltip title="Colour theme">
        <IconButton
          onClick={(event) => setAnchorEl(event.currentTarget)}
          size="small"
          aria-label={`Colour theme: ${selected?.label ?? "System"}`}
          sx={{ color: "inherit", visibility: mounted ? "visible" : "hidden" }}
        >
          <CurrentIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {options.map(({ mode: value, label, Icon }) => (
          <MenuItem
            key={value}
            selected={value === mode}
            onClick={() => {
              setMode(value);
              setAnchorEl(null);
            }}
          >
            <ListItemIcon>
              <Icon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ThemeModeSelect;
