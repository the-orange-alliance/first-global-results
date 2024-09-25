import { Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";

interface TickerProps {
  rankings: any[];
  multiplier?: number;
}

const TickerComponent: React.FC<TickerProps> = ({ rankings, multiplier = 3 }) => {
  return (
    <>
      <main className={'main'} style={{ overflow: 'hidden', height: '100vh' }}>
        <div className="marquee">
          <div className="marquee-content">
            <Stack direction={"row"}>
              {rankings.sort((a, b) => a.rank - b.rank).map((ranking) => {
                return (
                  <>
                    <Stack key={ranking.teamKey} direction={"row"} spacing={1} sx={{ whiteSpace: 'nowrap', alignItems: 'center', mx: 2 }}>
                      <Typography sx={{ fontSize: '25vh' }}>#{ranking.rank}</Typography>
                      <Image
                        src={`/static/flags/4x3/${ranking.team.countryCode.toLowerCase()}.svg`}
                        width={16}
                        height={12}
                        style={{
                          backgroundColor: "#ffffff",
                          width: "1em",
                          height: "0.75em",
                        }}
                        alt={`${ranking.team.countryCode} flag`}
                      />
                      <Typography sx={{ fontSize: '25vh' }}>{ranking.team.name.replace("Team ", "")}</Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                  </>
                );
              })}
            </Stack>
          </div>
        </div>
      </main>
      <style jsx>
        {`
        .main {
          background-color: #000 !important;
          color: #fff;
          display: flex;
          font-family: 'Roboto', sans-serif;
          font-size: 25vh;
        }
        .marquee {
          height: 100vh;
          color: #eee;
          overflow: hidden;
          position: relative;
        }
        .marquee:before, .marquee:after {
          position: absolute;
          top: 0;
          width: 10rem;
          height: 100%;
          content: "";
          z-index: 1;
        }
        .marquee:before {
          left: 0;
          background: linear-gradient(to right, #111 0%, transparent 100%);
        }
        .marquee:after {
          right: 0;
          background: linear-gradient(to left, #111 0%, transparent 100%);
        }
        .marquee-content {
          list-style: none;
          height: 100%;
          width: max-content;
          display: flex;
          animation: scrolling ${rankings.length * multiplier}s linear infinite;
        }
        @keyframes scrolling {
          0% {
            transform: translate(0, 0);
            -webkit-transform: translate(0, 0);
          }
          100% {
            transform: translate(-100%);
            -webkit-transform: translate(-100%);
          }
        }

      `}
      </style>
    </>
  );
};

export default TickerComponent;
