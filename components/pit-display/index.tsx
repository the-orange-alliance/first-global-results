import { useMemo } from "react";
import RankingCard from "@/components/pit-display/ranking-card";
import MatchesCard from "@/components/pit-display/matches-card";

interface PitDisplayProps {
  data: any;
}
const PitDisplay: React.FC<PitDisplayProps> = ({ data }) => {
  const matches = useMemo(() => {
    const matches = data.matches;
    const latestTournamentLevel = Math.max(
      ...matches.map((match) => match.tournamentLevel)
    );
    return matches.filter(
      (match) => match.tournamentLevel === latestTournamentLevel
    );
  }, [data]);

  return (
    <>
      <main className="pd-container">
        <div className="pd-header__wrapper">
          <img
            src="/static/results-qr-code.svg"
            className="pd-header__qrcode"
            alt="QR Code"
          />
          <div className="pd-header__content">
            <h1 className="pd-header__title">
              2022 <em>FIRST</em> Global Challenge
            </h1>
            <h2 className="pd-header__description">
              Real-time results are available at{" "}
              <span>results.first.global</span>
            </h2>
          </div>
        </div>
        <div className="pd-content">
          {data.rankings.length > 0 && matches.length > 0 ? (
            <>
              <RankingCard rankings={data.round_robin} />
              <MatchesCard matches={matches.filter((m) => m.played)} />
            </>
          ) : (
            <div className="error-message">
              <h1>No data available yet</h1>
              <h3>Hold tight, the matches haven’t begun yet</h3>
            </div>
          )}
        </div>
      </main>
      <style jsx>{`
        .pd-container {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: linear-gradient(#1d1d1d, #000);
          user-select: none;
          padding: 0 3.5rem 3.5rem;

          --table-row-height: 2.5rem;
          --table-row-padding: 0.5rem;
        }
        .pd-header__wrapper {
          display: flex;
          align-items: center;
          padding: 2.5rem 0;
        }
        .pd-header__qrcode {
          height: 5.5rem;
          width: 5.5rem;
          padding: 0.25rem;
          border-radius: 16px;
          background: #fff;
        }
        .pd-header__content {
          margin: 0 1.5rem;
        }
        .pd-header__title {
          font-size: 2.25rem;
          font-weight: 700;
          color: #fff;
          margin: 0;
          line-height: 1.25;
        }
        .pd-header__description {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.75);
          font-weight: 500;
          margin: 0.375rem 0 0;
          line-height: 1.25;
        }
        .pd-header__description span {
          font-weight: 700;
          color: #fff;
        }
        .pd-content {
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          overflow: hidden;
        }
        .error-message {
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        .error-message h1 {
          color: #ffffff;
          margin-bottom: 0;
        }
        .error-message h3 {
          color: rgba(255, 255, 255, 0.75);
          margin-top: 8px;
        }
        @keyframes marquee {
          0% {
            transform: translate(0, 0);
            -webkit-transform: translate(0, 0);
          }
          100% {
            transform: translate(0, -100%);
            -webkit-transform: translate(0, -100%);
          }
        }
      `}</style>
    </>
  );
};

export default PitDisplay;
