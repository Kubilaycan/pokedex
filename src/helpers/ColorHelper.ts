export default function TypeColor(type: string): string {
    switch (type) {
        case 'normal':
            return 'linear-gradient(135deg, #A8A878, #CACAC2)'; // Normal type gradient
        case 'fighting':
            return 'linear-gradient(135deg, #C03028, #E05A52)'; // Fighting type gradient
        case 'flying':
            return 'linear-gradient(135deg, #A890F0, #C0B2FF)'; // Flying type gradient
        case 'poison':
            return 'linear-gradient(135deg, #A040A0, #C060C0)'; // Poison type gradient
        case 'ground':
            return 'linear-gradient(135deg, #E0C068, #F0D080)'; // Ground type gradient
        case 'rock':
            return 'linear-gradient(135deg, #B8A038, #D8C858)'; // Rock type gradient
        case 'bug':
            return 'linear-gradient(135deg, #A8B820, #C0D840)'; // Bug type gradient
        case 'ghost':
            return 'linear-gradient(135deg, #705898, #8C72B0)'; // Ghost type gradient
        case 'steel':
            return 'linear-gradient(135deg, #B8B8D0, #D8D8E8)'; // Steel type gradient
        case 'fire':
            return 'linear-gradient(135deg, #F08030, #FFA860)'; // Fire type gradient
        case 'water':
            return 'linear-gradient(135deg, #6890F0, #8CB0FF)'; // Water type gradient
        case 'grass':
            return 'linear-gradient(135deg, #78C850, #98E870)'; // Grass type gradient
        case 'electric':
            return 'linear-gradient(135deg, #F8D030, #F8E860)'; // Electric type gradient
        case 'psychic':
            return 'linear-gradient(135deg, #F85888, #FF88A8)'; // Psychic type gradient
        case 'ice':
            return 'linear-gradient(135deg, #98D8D8, #B8F8F8)'; // Ice type gradient
        case 'dragon':
            return 'linear-gradient(135deg, #7038F8, #9C68FF)'; // Dragon type gradient
        case 'dark':
            return 'linear-gradient(135deg, #705848, #8C7058)'; // Dark type gradient
        case 'fairy':
            return 'linear-gradient(135deg, #EE99AC, #FFB9CC)'; // Fairy type gradient
        default:
            return 'linear-gradient(135deg, #000000, #303030)'; // Default gradient
    }
}
