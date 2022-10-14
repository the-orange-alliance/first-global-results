import { Box, Divider, Link, Stack } from "@mui/material";
import { Container } from "@mui/system";

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
          alt="FIRST Global"
        />
        <Stack
          direction="row"
          spacing={1}
          fontSize="0.875rem"
          divider={<Divider orientation="vertical" flexItem />}
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
        </Stack>
      </Container>
    </Box>
  );
};

export default Navigation;
