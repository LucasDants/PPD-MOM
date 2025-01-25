 export function generateMockMeasure(minSafeMeasure: number, maxSafeMeasure: number) {
    const numbersBetweenRange = (Math.abs(maxSafeMeasure) - Math.abs(minSafeMeasure)) / 2

    const maxRandomValue = maxSafeMeasure + numbersBetweenRange
    const minRandomValue = minSafeMeasure - numbersBetweenRange

    const randomBetweenRange = Math.floor(Math.random() * (maxRandomValue - minRandomValue + 1)) + minRandomValue

    return randomBetweenRange
  }