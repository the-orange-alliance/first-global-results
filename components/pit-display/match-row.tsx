interface MatchRowProps {
  match: any;
}

const MatchRow: React.FC<MatchRowProps> = ({ match }) => {
  const winner =
    match.redScore > match.blueScore
      ? "R"
      : match.blueScore > match.redScore
      ? "B"
      : "T";

  return (
    <div className="pd-card__row" data-win={match.played ? winner : null}>
      <div className="pd-card__col" data-type="match">
        {match.matchName}
      </div>
      <div className="pd-card__col" data-type="score">
        {match.played && (
          <>
            <span className="red-score">{match.redScore}</span>
            &nbsp;-&nbsp;
            <span className="blue-score">{match.blueScore}</span>
          </>
        )}
      </div>
      {match.participants.map((p) => (
        <div
          key={p.station}
          className="pd-card__col"
          data-type={p.station > 20 ? "blue" : "red"}
        >
          {p.team.country}
          {p.surrogate ? "*" : null}
        </div>
      ))}
    </div>
  );
};

export default MatchRow;
