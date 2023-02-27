

export function NumToBol(value: 0 | 1 | boolean) {
    if (value === 1) {
        return false
    } else if (value === 0) {
        return true
    } else {
        return value
    }
}

