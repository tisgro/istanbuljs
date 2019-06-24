import React from 'react';

function Ignores({ metrics, metricsToShow }) {
    const metricKeys = Object.keys(metricsToShow);
    const result = [];

    for (let i = 0; i < metricKeys.length; i++) {
        const metricKey = metricKeys[i];
        if (metricsToShow[metricKey]) {
            const skipped = metrics[metricKey].skipped;
            if (skipped > 0) {
                result.push(
                    `${skipped} ${metricKey}${
                        skipped === 1 ? '' : metricKey === 'branch' ? 'es' : 's'
                    }`
                );
            }
        }
    }

    if (result.length === 0) {
        return false;
    }

    return (
        <div className="toolbar__item">
            <span className="strong">{result.join(', ')}</span>
            <span className="quiet">Ignored</span>
        </div>
    );
}

function StatusMetric({ data, name }) {
    return (
        <div className="toolbar__item">
            <div className={`bignum ${data.classForPercent}`}>
                <div className="bignum__label">{name}</div>
                <div className="bignum__data">{data.pct}%</div>
                <div className="bignum__subdata">
                    {data.covered} of {data.total}
                </div>
            </div>
        </div>
    );
}

export default function SummaryHeader({ metrics, metricsToShow }) {
    return (
        <div className="toolbar">
            {metricsToShow.statements && (
                <StatusMetric data={metrics.statements} name="Statements" />
            )}
            {metricsToShow.branches && (
                <StatusMetric data={metrics.branches} name="Branches" />
            )}
            {metricsToShow.functions && (
                <StatusMetric data={metrics.functions} name="Functions" />
            )}
            {metricsToShow.lines && (
                <StatusMetric data={metrics.lines} name="Lines" />
            )}
            <Ignores metrics={metrics} metricsToShow={metricsToShow} />
        </div>
    );
}
