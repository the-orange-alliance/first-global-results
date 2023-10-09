import { watchLinks } from "@/lib/data";
import { Box, BoxTypeMap, Button, Link } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";

interface MatchTimeProps {
  match: any;
  width: BoxTypeMap["props"]["width"];
}

const MatchTime: React.FC<MatchTimeProps> = ({ match, width }) => {
  const [time, setTime] = useState<string | null>("");
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (match.scheduledTime) {
      const start = moment(match.scheduledTime);
      let formatted = start.format("ddd, HH:mm");
      if (match.field) formatted += `, Field #${match.field}`;
      setTime(formatted);
      const checkLive = () => {
        setIsLive(
          start.isBetween(
            moment().subtract(3.5, "minutes"),
            moment().add(3.5, "minutes")
          )
        );
      };
      checkLive();
      const interval = setInterval(checkLive, 30 * 1000);
      return () => clearInterval(interval);
    } else {
      setTime(null);
    }
  }, [match.scheduledTime]);

  return (
    <Box
      bgcolor={(theme) =>
        isLive ? theme.palette.primary.main : theme.palette.grey[50]
      }
      px="0.5em"
      py="0.375em"
      fontSize="0.875em"
      width={width}
      textAlign="center"
      display="flex"
      alignSelf="stretch"
      alignItems="center"
      justifyContent="center"
    >
      {isLive ? (
        <Link
          href={watchLinks["field" + match.field] || watchLinks.main}
          target="_blank"
          sx={{
            fontWeight: 500,
            px: "0.5em",
            color: "#fff",
            lineHeight: 1.2,
            "&:hover": {
              color: "#ffffffbf",
              textDecoration: "none",
            },
          }}
        >
          Watch Live
        </Link>
      ) : (
        time || "TBD"
      )}
    </Box>
  );
};

export default MatchTime;
