export function getWastedMs(audit) {
  if (audit.result.details && audit.result.details.type === 'opportunity') {
    const details = audit.result.details;
    if (typeof details.overallSavingsMs !== 'number') {
      throw new Error('non-opportunity details passed to _getWastedMs');
    }
    return details.overallSavingsMs;
  } else {
    return Number.MIN_VALUE;
  }
}