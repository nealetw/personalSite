export const ROW_CATEGORIES = [
    { label: 'Noun', function: 'partOfSpeech' },
    { label: 'Verb', function: 'partOfSpeech' },
    { label: 'Adjective', function: 'partOfSpeech' },
    { label: 'Pronoun', function: 'partOfSpeech' },
    { label: 'Proposition', function: 'partOfSpeech' },
    { label: 'Adverb', function: 'partOfSpeech' },
];

export const COLUMN_CATEGORIES = [
    { label: 'Uses Letter A', function: 'usesLetter' },
    { label: 'Uses Letter B', function: 'usesLetter' },
    { label: 'Uses Letter C', function: 'usesLetter' },
    { label: 'Uses Letter D', function: 'usesLetter' },
    { label: 'Uses Letter E', function: 'usesLetter' },
    { label: 'Uses Letter F', function: 'usesLetter' },
    { label: 'Uses Letter G', function: 'usesLetter' },
    { label: 'Uses Letter H', function: 'usesLetter' },
    { label: 'Uses Letter I', function: 'usesLetter' },
    { label: 'Uses Letter J', function: 'usesLetter' },
    { label: 'Uses Letter K', function: 'usesLetter' },
    { label: 'Uses Letter L', function: 'usesLetter' },
    { label: 'Uses Letter M', function: 'usesLetter' },
    { label: 'Uses Letter N', function: 'usesLetter' },
    { label: 'Uses Letter O', function: 'usesLetter' },
    { label: 'Uses Letter P', function: 'usesLetter' },
    { label: 'Uses Letter Q', function: 'usesLetter' },
    { label: 'Uses Letter R', function: 'usesLetter' },
    { label: 'Uses Letter S', function: 'usesLetter' },
    { label: 'Uses Letter T', function: 'usesLetter' },
    { label: 'Uses Letter U', function: 'usesLetter' },
    { label: 'Uses Letter V', function: 'usesLetter' },
    { label: 'Uses Letter W', function: 'usesLetter' },
    { label: 'Uses Letter X', function: 'usesLetter' },
    { label: 'Uses Letter Y', function: 'usesLetter' },
    { label: 'Uses Letter Z', function: 'usesLetter' },
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
        case 'partOfSpeech':
            return partOfSpeech;

        default:
            break;
    }
}

function usesLetter(word, label) {
    const letter = label.slice(-1);
    return word.word.toLowerCase().includes(letter.toLowerCase());
}
function partOfSpeech(word, label) {
    return true;
}
