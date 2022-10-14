import { Box, BoxTypeMap } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";

interface MatchTimeProps {
  startTime: string;
  width: BoxTypeMap["props"]["width"];
}

const MatchTime: React.FC<MatchTimeProps> = ({ startTime, width }) => {
  const [time, setTime] = useState<string | null>("");

  useEffect(() => {
    if (startTime) {
      const formatted = moment(startTime).format("ddd, HH:mm");
      setTime(formatted);
    } else {
      setTime(null);
    }
  }, [startTime]);

  return (
    <Box
      bgcolor={(theme) => theme.palette.grey[50]}
      px={1.5}
      py={0.5}
      fontSize="0.875rem"
      width={width}
      textAlign="center"
      alignSelf="stretch"
    >
      {time || "TBD"}
    </Box>
  );
};

export default MatchTime;
