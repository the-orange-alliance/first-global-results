import { pastYears, yearData } from "@/lib/data";
import {
  Box,
  Button,
  Container,
  Divider,
  Link,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { useState } from "react";
import ThemeModeSelect from "./theme-mode-select";

const links = [
  {
    label: "About",
    href: "https://first.global/about/",
  },
  {
    label: "The Challenge",
    href: "https://first.global/fgc/",
  },
  {
    label: "Donate",
    href: "https://first.global/donate/",
  },
];

const Navigation = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const historyYears = pastYears.map((year) => {
    // split on "in"
    const [yearLabel, location] = yearData[year].date.split(" in ");
    return {
      year,
      label: `${year} (${location})`,
    };
  });

  return (
    <Box
      component="nav"
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        py: 1,
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          // The logo and the link row together need ~460px. Below that they
          // wrap onto two centred lines instead of pushing the whole page into
          // a horizontal scroll.
          flexWrap: "wrap",
          rowGap: 1,
          justifyContent: { xs: "center", sm: "space-between" },
        }}
      >
        {/* FIRST Global publish this mark as black-on-transparent only, so it
            vanishes against a dark nav.  It is flat black artwork and inverts
            cleanly; the brightness trim stops the inverted white glaring. */}
        <Box
          component="img"
          src="https://first.global/wp-content/uploads/2017/11/FG-header-black.png"
          height={56}
          alt="FIRST Global logo"
          sx={(theme) => ({
            ...theme.applyStyles("dark", {
              filter: "invert(1) brightness(0.9)",
            }),
          })}
        />
        <Stack
          direction="row"
          spacing={1}
          divider={<Divider orientation="vertical" flexItem />}
          sx={{
            fontSize: "0.875rem"
          }}
        >
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              sx={{
                color: "inherit",
                "&:hover": { color: "text.secondary" },
                transition: "color 0.2s ease-in-out",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Button
            onClick={handleClick}
            onMouseOver={handleClick}
            sx={{
              color: "inherit",
              "&:hover": { color: "text.secondary" },
              fontWeight: "inherit",
            }}
          >
            History
          </Button>
          <ThemeModeSelect />
        </Stack>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          slotProps={{ list: { onMouseLeave: handleClose } }}
        >
          {historyYears.map((yearInfo) => (
            <MenuItem
              key={yearInfo.year}
              onClick={handleClose}
              component={Link}
              href={`/history/${yearInfo.year}`}
            >
              {yearInfo.label}
            </MenuItem>
          ))}
        </Menu>
      </Container>
    </Box>
  );
};

export default Navigation;
