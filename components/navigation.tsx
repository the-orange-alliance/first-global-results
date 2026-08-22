import { pastYears, yearData } from "@/lib/data";
import {
  Box,
  Button,
  Divider,
  Link,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";

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
      label: `${yearLabel} (${location})`,
    };
  });

  return (
    <Box
      component="nav"
      sx={{
        bgcolor: "white",
        borderBottom: "1px solid",
        borderColor: "divider",
        py: 1,
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img
          src="https://first.global/wp-content/uploads/2017/11/FG-header-black.png"
          height={56}
          alt="FIRST Global logo"
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
                "&:hover": { color: "rgba(0, 0, 0, 0.75)" },
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
              "&:hover": { color: "rgba(0, 0, 0, 0.75)" },
              fontWeight: "inherit",
            }}
          >
            History
          </Button>
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
