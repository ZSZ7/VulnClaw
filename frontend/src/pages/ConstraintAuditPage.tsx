import { useConstraintAuditQuery } from "../hooks/queries";

export function ConstraintAuditPage() {
  const auditQuery = useConstraintAuditQuery();
  const data = auditQuery.data;

  return (
    <section className="card">
      <header className="card-header">
        <div>
          <h3>Constraint Audit</h3>
          <p>Review blocked out-of-scope actions, grouped by source and rule code.</p>
        </div>
        <span className="status-badge">{data?.total_events ?? 0} events</span>
      </header>

      <div className="stats-grid">
        <article className="stat">
          <span className="stat-label">Total Events</span>
          <strong>{data?.total_events ?? 0}</strong>
        </article>
        <article className="stat">
          <span className="stat-label">High Severity</span>
          <strong>{data?.high_severity_events ?? 0}</strong>
        </article>
        <article className="stat">
          <span className="stat-label">Source Kinds</span>
          <strong>{data ? Object.keys(data.by_source).length : 0}</strong>
        </article>
        <article className="stat">
          <span className="stat-label">Rule Codes</span>
          <strong>{data ? Object.keys(data.by_code).length : 0}</strong>
        </article>
      </div>

      <div className="split-grid inner-grid">
        <article className="card inset-card">
          <h4>By Source</h4>
          <div className="list">
            {data && Object.entries(data.by_source).length ? (
              Object.entries(data.by_source).map(([key, value]) => (
                <div key={key} className="list-item">
                  <strong>{key}</strong>
                  <span>{value}</span>
                </div>
              ))
            ) : (
              <div className="empty-state">No source statistics yet.</div>
            )}
          </div>
        </article>

        <article className="card inset-card">
          <h4>By Code</h4>
          <div className="list">
            {data && Object.entries(data.by_code).length ? (
              Object.entries(data.by_code).map(([key, value]) => (
                <div key={key} className="list-item">
                  <strong>{key}</strong>
                  <span>{value}</span>
                </div>
              ))
            ) : (
              <div className="empty-state">No rule code statistics yet.</div>
            )}
          </div>
        </article>
      </div>

      <article className="card inset-card inner-grid">
        <h4>Recent Events</h4>
        <div className="list list-scroll">
          {data?.recent_events.length ? (
            data.recent_events.map((event, index) => (
              <div key={`${event.timestamp}-${index}`} className="list-item">
                <strong>[{event.severity}|{event.source}] {event.summary}</strong>
                <span>{event.target}</span>
                <span className="muted-inline">code={event.code || "unknown"} · action={event.action || "n/a"} · tool={event.tool_name || "n/a"}</span>
                <span className="muted-inline">{event.timestamp}</span>
              </div>
            ))
          ) : (
            <div className="empty-state">No blocked constraint violations recorded yet.</div>
          )}
        </div>
      </article>
    </section>
  );
}
