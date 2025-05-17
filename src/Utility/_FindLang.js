export const FindLang = async (Lang) => {
 try {
    let Language = await import( /* @vite-ignore */`../Lang/${Lang}.js`);
    return Language.Lang;
 } catch {
    const DefaultLang = await import( /* @vite-ignore */'../Lang/en.js');
    return DefaultLang.Lang;
 }
};
