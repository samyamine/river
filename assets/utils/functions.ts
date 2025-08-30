
function truncateSentenceSafe(str: string, maxLenght = 50) {
    if (str.length <= maxLenght) return str;

    let trimmed = str.slice(0, maxLenght - 3);

    if (trimmed[-1] !== " ") {
        trimmed = trimmed.slice(0, trimmed.lastIndexOf(" "));
    }

    return trimmed + "...";
}

export {
    truncateSentenceSafe
};

