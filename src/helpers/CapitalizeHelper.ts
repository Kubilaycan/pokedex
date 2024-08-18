export default function Capitalize(text: string | undefined, divider?: string): string | undefined {
    if (text) {
        if (divider) {
            return text?.split(divider).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
        } else {
            return text?.charAt(0).toUpperCase() + text?.slice(1);
        }
    }
}
