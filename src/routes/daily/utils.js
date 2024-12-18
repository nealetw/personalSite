export const ROW_CATEGORIES = [
    { label: 'Noun', function: 'partOfSpeech' },
    { label: 'Verb', function: 'partOfSpeech' },
    { label: 'Adjective', function: 'partOfSpeech' },
    { label: 'Pronoun', function: 'partOfSpeech' },
    { label: 'Preposition', function: 'partOfSpeech' },
    { label: 'Adverb', function: 'partOfSpeech' },
];

export const COLUMN_CATEGORIES = [
    { label: 'Contains Letter: A', function: 'usesLetter' },
    { label: 'Contains Letter: B', function: 'usesLetter' },
    { label: 'Contains Letter: C', function: 'usesLetter' },
    { label: 'Contains Letter: D', function: 'usesLetter' },
    { label: 'Contains Letter: E', function: 'usesLetter' },
    { label: 'Contains Letter: F', function: 'usesLetter' },
    { label: 'Contains Letter: G', function: 'usesLetter' },
    { label: 'Contains Letter: H', function: 'usesLetter' },
    { label: 'Contains Letter: I', function: 'usesLetter' },
    { label: 'Contains Letter: J', function: 'usesLetter' },
    { label: 'Contains Letter: K', function: 'usesLetter' },
    { label: 'Contains Letter: L', function: 'usesLetter' },
    { label: 'Contains Letter: M', function: 'usesLetter' },
    { label: 'Contains Letter: N', function: 'usesLetter' },
    { label: 'Contains Letter: O', function: 'usesLetter' },
    { label: 'Contains Letter: P', function: 'usesLetter' },
    { label: 'Contains Letter: Q', function: 'usesLetter' },
    { label: 'Contains Letter: R', function: 'usesLetter' },
    { label: 'Contains Letter: S', function: 'usesLetter' },
    { label: 'Contains Letter: T', function: 'usesLetter' },
    { label: 'Contains Letter: U', function: 'usesLetter' },
    { label: 'Contains Letter: V', function: 'usesLetter' },
    { label: 'Contains Letter: W', function: 'usesLetter' },
    { label: 'Contains Letter: X', function: 'usesLetter' },
    { label: 'Contains Letter: Y', function: 'usesLetter' },
    { label: 'Contains Letter: Z', function: 'usesLetter' },
    { label: 'Starts with: A', function: 'startingLetter' },
    { label: 'Starts with: B', function: 'startingLetter' },
    { label: 'Starts with: C', function: 'startingLetter' },
    { label: 'Starts with: D', function: 'startingLetter' },
    { label: 'Starts with: E', function: 'startingLetter' },
    { label: 'Starts with: F', function: 'startingLetter' },
    { label: 'Starts with: G', function: 'startingLetter' },
    { label: 'Starts with: H', function: 'startingLetter' },
    { label: 'Starts with: I', function: 'startingLetter' },
    { label: 'Starts with: J', function: 'startingLetter' },
    { label: 'Starts with: K', function: 'startingLetter' },
    { label: 'Starts with: L', function: 'startingLetter' },
    { label: 'Starts with: M', function: 'startingLetter' },
    { label: 'Starts with: N', function: 'startingLetter' },
    { label: 'Starts with: O', function: 'startingLetter' },
    { label: 'Starts with: P', function: 'startingLetter' },
    { label: 'Starts with: Q', function: 'startingLetter' },
    { label: 'Starts with: R', function: 'startingLetter' },
    { label: 'Starts with: S', function: 'startingLetter' },
    { label: 'Starts with: T', function: 'startingLetter' },
    { label: 'Starts with: U', function: 'startingLetter' },
    { label: 'Starts with: V', function: 'startingLetter' },
    { label: 'Starts with: W', function: 'startingLetter' },
    { label: 'Starts with: X', function: 'startingLetter' },
    { label: 'Starts with: Y', function: 'startingLetter' },
    { label: 'Starts with: Z', function: 'startingLetter' },
];

export function getCategory(rowOrCol, exclude) {
    const isRow = rowOrCol === 'row';
    let index;

    if (exclude.length) {
        let tryNo = 1;
        do {
            index =
                generateNumber(tryNo) %
                (isRow ? ROW_CATEGORIES : COLUMN_CATEGORIES).length;
            tryNo++;
        } while (exclude.includes(index));
    }
    if (isRow) return { label: ROW_CATEGORIES[index]?.label, category: index };
    return { label: COLUMN_CATEGORIES[index]?.label, category: index };
}

export function processWord(word, cat1, cat2) {
    const categoryRowObject = ROW_CATEGORIES[cat1];
    const categoryColumnObject = COLUMN_CATEGORIES[cat2];
    const matchesRow = functionMapper(categoryRowObject.function)(
        word,
        categoryRowObject.label
    );
    const matchesColumn = functionMapper(categoryColumnObject.function)(
        word,
        categoryColumnObject.label
    );
    return matchesColumn && matchesRow;
}

function generateNumber(tryNo = 1) {
    const date = new Date();
    const dateSum = date.getDate() + date.getMonth() + date.getFullYear();
    const generated = Math.pow((dateSum - tryNo) * (tryNo + 13), 3);
    return generated;
}

function functionMapper(functionString) {
    switch (functionString) {
        case 'usesLetter':
            return usesLetter;
        case 'startingLetter':
            return startingLetter;
        case 'partOfSpeech':
            return partOfSpeech;

        default:
            break;
    }
}

function usesLetter(word, label) {
    const letter = label.slice(-1).toLowerCase();
    return word.word.toLowerCase().includes(letter);
}
function startingLetter(word, label) {
    const letter = label.slice(-1).toLowerCase();
    return word.word.slice(0, 1).toLowerCase() == letter;
}
function partOfSpeech(word, label) {
    const possibleParts = word.meanings.map((m) => m.partOfSpeech);
    return possibleParts.includes(label.toLowerCase());
}
