export const getRandomId = ()=>{
    let allCapitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let allSmallLetter = "abcdefghijklmnopqrstuvwxyz";
    let allNumbers = "1234567890";
    let allSymbols = "!@#$%^&*_-";
    let allChars = "";
    allChars += allCapitalLetters;
    allChars += allSmallLetter;
    allChars += allNumbers;
    allChars += allSymbols;
    let finalPassword = "";
    for (let i = 0; i < 32; i++) {
        var random = allChars.charAt(Math.floor(Math.random() * allChars.length));
        finalPassword = finalPassword + random;
    }
    return finalPassword;
}