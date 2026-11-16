export function resolveStagger(totalDuration: number, duration: number, targetCount: number, fallback: number) {

    if (!totalDuration || targetCount <= 1) {
        return fallback
    }

    return Math.max(
        0,
        (totalDuration - duration) / (targetCount - 1)
    )
}