

export function NumToBol(value: 0 | 1 | boolean) {
    if (Number(value) === 1) {
        return true
    } else if (Number(value) === 0) {
        return false
    } else {
        return value
    }
}

