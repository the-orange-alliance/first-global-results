import { useEffect, useState } from "react";
import MatchRow from "@/components/pit-display/match-row";
import { marquee } from "@/lib";

interface MatchesCardProps {
  matches: any[];
}

const MatchesCard: React.FC<MatchesCardProps> = ({ matches }) => {
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    const matchesScroll = document.querySelector("#matches-scroll");
    setShouldScroll(
      matchesScroll.clientHeight > matchesScroll.parentElement.clientHeight
    );
  }, [matches]);

  const matchesView = matches.map((match) => (
    <MatchRow key={match.matchKey} match={match} />
  ));

  return (
    <>
      <div className="pd-card" style={{ marginRight: 20 }}>
        <div className="pd-card__row pd-card__header">
          <div className="pd-card__col" data-type="match">
            Match
          </div>
          <div className="pd-card__col" data-type="score">
            Score
          </div>
          <div className="pd-card__col" data-type="red">
            Red Alliance
          </div>
          <div className="pd-card__col" data-type="blue">
            Blue Alliance
          </div>
        </div>
        <div className="pd-marquee">
          <div
            id="matches-scroll"
            style={{
              animation: shouldScroll ? marquee(matches.length) : "none",
            }}
          >
            {matchesView}
          </div>
          <div
            style={{
              display: shouldScroll ? undefined : "none",
              animation: shouldScroll ? marquee(matches.length) : "none",
            }}
          >
            {matchesView}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .pd-card {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          background-color: #fafafa;
          border-radius: 8px;
          overflow: hidden;
        }
        .pd-marquee {
          height: inherit;
          width: 100%;
          position: relative;
          overflow: hidden;
        }
        .pd-marquee > div {
          padding-bottom: var(--table-row-height);
        }
        .pd-card__row {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          min-height: calc(var(--table-row-height) - var(--table-row-padding));
        }
        .pd-card__header {
          min-height: 3.5rem;
          font-weight: 500;
          line-height: 1;
          text-align: center;
          box-shadow: 0 10px 8px -5px rgba(0, 0, 0, 0.12);
        }
        .pd-card__row:not(.pd-card__header) {
          font-size: 0.875rem;
        }
        .pd-card__row:not(.pd-card__header):nth-of-type(odd) {
          background: rgba(0, 0, 0, 0.025);
        }
        .pd-card__col {
          min-height: calc(var(--table-row-height) - var(--table-row-padding));
          padding: var(--table-row-padding) 0;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }
        .pd-card__header .pd-card__col[data-type="red"] {
          color: #fff;
          background: var(--red);
        }
        .pd-card__row:not(.pd-card__header) .pd-card__col[data-type="red"] {
          background: var(--lighter-red);
        }
        .pd-card__row:not(.pd-card__header):nth-of-type(odd)
          .pd-card__col[data-type="red"] {
          background: var(--light-red);
        }
        .pd-card__col[data-type="match"] {
          text-align: center;
          width: 9rem;
          min-width: 9rem;
          font-weight: 500;
        }
        .pd-card__col[data-type="score"] {
          width: 6rem;
          min-width: 6rem;
        }
        .pd-card__header .pd-card__col[data-type="blue"] {
          color: #fff;
          background: var(--blue);
        }
        .pd-card__row:not(.pd-card__header) .pd-card__col[data-type="blue"] {
          background: var(--lighter-blue);
        }
        .pd-card__row:not(.pd-card__header):nth-of-type(odd)
          .pd-card__col[data-type="blue"] {
          background: var(--light-blue);
        }
        .pd-card__row[data-win="T"] .pd-card__col[data-type="match"] {
          color: var(--green);
        }
        .pd-card__row[data-win="R"] .pd-card__col[data-type="match"],
        .pd-card__row[data-win="R"] .pd-card__col[data-type="red"],
        .pd-card__row[data-win="R"] .red-score {
          color: var(--red);
          font-weight: 500;
        }
        .pd-card__row[data-win="B"] .pd-card__col[data-type="match"],
        .pd-card__row[data-win="B"] .pd-card__col[data-type="blue"],
        .pd-card__row[data-win="B"] .blue-score {
          color: var(--blue);
          font-weight: 500;
        }
      `}</style>
    </>
  );
};

export default MatchesCard;
