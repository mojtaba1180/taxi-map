

export function NumToBol(value: 0 | 1 | boolean) {
    if (Number(value) === 1) {
        return false
    } else if (Number(value) === 0) {
        return true
    } else {
        return value
    }
}

