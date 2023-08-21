export function roundTo(number: number, digits: number) {
    if (digits === undefined) {
        digits = 0;
    }

    const multiplicator = Math.pow(10, digits);
    number = parseFloat((number * multiplicator).toFixed(11));
    const test = (Math.round(number) / multiplicator);
    return +(test.toFixed(digits));
}