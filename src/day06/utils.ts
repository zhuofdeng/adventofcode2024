export const replaceAt = (text: string, index: number, char: string): string => {
    let newString = text.split('');
    newString[index] = char;
    return newString.join('');
}