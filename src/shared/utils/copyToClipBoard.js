//this is the copy to clipboard utility function which will be used to handle the copy to clipboard functionality of the app
export const copyToClipboard = (text) => {
    try {
        if(!text) return false;
        navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        return false;
    }
}
