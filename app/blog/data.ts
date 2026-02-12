import {
    LucideIcon,
    Brain,
    Apple,
    Dumbbell,
    Flame,
    TrendingUp,
    Moon,
    Zap,
    Target,
    Beef,
    Droplets,
    Wheat,
    Heart,
    Footprints,
    ArrowUp,
    Monitor,
    Coffee,
    ShoppingBag,
    Activity,
    Scale,
    Timer,
    BarChart3,
    CircleDot,
} from 'lucide-react';

// ─── Types riches pour le contenu structuré ───────────────────────────

export interface ChartDataPoint {
    name: string;
    value: number;
    value2?: number;
    color?: string;
}

export type ContentBlock =
    | { type: 'paragraph'; text: string }
    | { type: 'heading'; text: string; icon?: LucideIcon }
    | { type: 'stats'; items: { value: string; label: string; icon: LucideIcon }[] }
    | { type: 'tip'; title: string; text: string; icon: LucideIcon; variant: 'cyan' | 'blue' | 'amber' | 'green' }
    | { type: 'list'; items: { icon: LucideIcon; title: string; text: string }[] }
    | { type: 'quote'; text: string; author?: string }
    | { type: 'chart'; chartType: 'bar' | 'pie' | 'area'; title: string; subtitle?: string; data: ChartDataPoint[]; unit?: string }
    | { type: 'divider' };

export interface Post {
    id: number;
    slug: string;
    category: string;
    title: string;
    desc: string;
    time: string;
    Icon: LucideIcon;
    color: string;
    gradient: string;
    blocks: ContentBlock[];
}

// ─── Articles ─────────────────────────────────────────────────────────

export const posts: Post[] = [
    {
        id: 1,
        slug: "comprendre-le-metabolisme-basal",
        category: "Science",
        title: "TDEE & Métabolisme : Le Guide Complet",
        desc: "Comprends exactement comment ton corps dépense de l'énergie, calcule ton TDEE avec précision, et apprends à manipuler chaque levier pour transformer ta composition corporelle.",
        time: "12 min",
        Icon: Brain,
        color: "from-cyan-500/20",
        gradient: "from-cyan-500 to-blue-600",
        blocks: [
            // ── INTRO ──────────────────────────────────────
            {
                type: 'paragraph',
                text: "Avant de parler de régime, de sèche ou de prise de masse, il faut comprendre **une seule chose** : comment ton corps dépense de l'énergie. C'est la base de tout. Sans ça, tu avances à l'aveugle."
            },
            {
                type: 'paragraph',
                text: "Ton corps brûle des calories 24h/24, même quand tu dors. Cette dépense totale s'appelle le **TDEE** (Total Daily Energy Expenditure). C'est **le chiffre le plus important** de ta transformation physique."
            },
            {
                type: 'stats',
                items: [
                    { value: "TDEE", label: "Dépense Énergétique Totale", icon: Flame },
                    { value: "4", label: "Composantes du TDEE", icon: BarChart3 },
                    { value: "±500", label: "kcal = perte ou gain", icon: TrendingUp },
                ]
            },
            { type: 'divider' },

            // ── QU'EST-CE QUE LE TDEE ? ────────────────────
            {
                type: 'heading',
                text: "Qu'est-ce que le TDEE ?",
                icon: Brain,
            },
            {
                type: 'paragraph',
                text: "Le TDEE (Total Daily Energy Expenditure) représente le **nombre total de calories** que ton corps brûle en une journée. C'est la somme de 4 composantes :"
            },
            {
                type: 'list',
                items: [
                    {
                        icon: Brain,
                        title: "MB — Métabolisme Basal (60–75%)",
                        text: "L'énergie dépensée au repos complet pour maintenir tes fonctions vitales : respiration, circulation sanguine, activité cérébrale, thermorégulation. C'est le plus gros poste de dépense."
                    },
                    {
                        icon: Flame,
                        title: "TEF — Effet Thermique des Aliments (8–15%)",
                        text: "L'énergie nécessaire pour digérer, absorber et métaboliser les nutriments. Les protéines ont le TEF le plus élevé (20-30%), suivies des glucides (5-10%), puis des lipides (0-3%)."
                    },
                    {
                        icon: Dumbbell,
                        title: "EAT — Activité Physique Volontaire (5–15%)",
                        text: "La musculation, le cardio, le sport. Étonnamment, ce n'est PAS le principal levier. Une séance de 60 min = 200-400 kcal seulement."
                    },
                    {
                        icon: Footprints,
                        title: "NEAT — Thermogenèse hors exercice (15–30%)",
                        text: "Toutes les dépenses du quotidien : marcher, monter les escaliers, gesticuler, rester debout, taper au clavier. Peut varier de 200 à 2000 kcal/jour selon les individus !"
                    },
                ]
            },
            {
                type: 'chart',
                chartType: 'pie',
                title: 'Les 4 composantes du TDEE',
                subtitle: 'Répartition moyenne pour un adulte actif',
                unit: '%',
                data: [
                    { name: 'Métabolisme Basal (MB)', value: 65, color: '#22d3ee' },
                    { name: 'NEAT', value: 15, color: '#3b82f6' },
                    { name: 'Activité sportive (EAT)', value: 10, color: '#6366f1' },
                    { name: 'Digestion (TEF)', value: 10, color: '#8b5cf6' },
                ]
            },
            { type: 'divider' },

            // ── LE MÉTABOLISME BASAL EN DÉTAIL ──────────────
            {
                type: 'heading',
                text: "Le Métabolisme Basal en détail",
                icon: Activity,
            },
            {
                type: 'paragraph',
                text: "Le MB, c'est l'énergie que ton corps dépense au repos complet — simplement pour maintenir tes fonctions vitales. Même si tu passais 24h allongé sans bouger, ton corps brûlerait entre **1200 et 2000 kcal**."
            },
            {
                type: 'tip',
                title: "Formule de Mifflin-St Jeor (la plus fiable)",
                text: "Homme : MB = (10 × poids en kg) + (6.25 × taille en cm) − (5 × âge) + 5\nFemme : MB = (10 × poids en kg) + (6.25 × taille en cm) − (5 × âge) − 161\n\nExemple : Homme de 80kg, 180cm, 25 ans → MB = 800 + 1125 − 125 + 5 = **1805 kcal/jour**",
                icon: Target,
                variant: 'cyan',
            },
            {
                type: 'paragraph',
                text: "Plusieurs facteurs influencent ton MB : la **masse musculaire** (le muscle brûle 3× plus que la graisse au repos), l'**âge** (baisse de 2-3% par décennie), le **sexe** (les hommes ont un MB ~10% plus élevé), et tes **hormones** (thyroïde, cortisol, insuline)."
            },
            {
                type: 'chart',
                chartType: 'area',
                title: 'Déclin du MB avec l\'âge',
                subtitle: 'Métabolisme basal moyen (homme, 75kg, 178cm)',
                unit: ' kcal',
                data: [
                    { name: '20 ans', value: 1800 },
                    { name: '25 ans', value: 1775 },
                    { name: '30 ans', value: 1746 },
                    { name: '35 ans', value: 1720 },
                    { name: '40 ans', value: 1693 },
                    { name: '45 ans', value: 1668 },
                    { name: '50 ans', value: 1641 },
                    { name: '55 ans', value: 1615 },
                    { name: '60 ans', value: 1590 },
                    { name: '65 ans', value: 1565 },
                    { name: '70 ans', value: 1540 },
                ]
            },
            { type: 'divider' },

            // ── CALCULER TON TDEE ──────────────────────────
            {
                type: 'heading',
                text: "Calculer ton TDEE : la méthode",
                icon: Target,
            },
            {
                type: 'paragraph',
                text: "Une fois ton MB calculé, tu le multiplies par un **coefficient d'activité** pour obtenir ton TDEE. Ce coefficient prend en compte tout : sport, NEAT, travail, mode de vie."
            },
            {
                type: 'list',
                items: [
                    {
                        icon: Monitor,
                        title: "Sédentaire — ×1.2",
                        text: "Travail de bureau, peu ou pas de sport. Exemple : MB de 1800 → TDEE = 2160 kcal"
                    },
                    {
                        icon: Footprints,
                        title: "Légèrement actif — ×1.375",
                        text: "Sport 1 à 3 fois/semaine ou travail avec marche. Exemple : MB de 1800 → TDEE = 2475 kcal"
                    },
                    {
                        icon: Activity,
                        title: "Modérément actif — ×1.55",
                        text: "Sport 3 à 5 fois/semaine. Exemple : MB de 1800 → TDEE = 2790 kcal"
                    },
                    {
                        icon: Dumbbell,
                        title: "Très actif — ×1.725",
                        text: "Sport intense 6-7 fois/semaine ou travail physique. Exemple : MB de 1800 → TDEE = 3105 kcal"
                    },
                    {
                        icon: Zap,
                        title: "Extrêmement actif — ×1.9",
                        text: "Athlète professionnel ou travail très physique + sport. Exemple : MB de 1800 → TDEE = 3420 kcal"
                    },
                ]
            },
            {
                type: 'chart',
                chartType: 'bar',
                title: 'Impact du coefficient d\'activité sur le TDEE',
                subtitle: 'Pour un MB de 1800 kcal (homme, 80kg, 25 ans)',
                unit: ' kcal',
                data: [
                    { name: 'Sédentaire', value: 2160, color: '#ef4444' },
                    { name: 'Léger', value: 2475, color: '#f59e0b' },
                    { name: 'Modéré', value: 2790, color: '#22d3ee' },
                    { name: 'Très actif', value: 3105, color: '#3b82f6' },
                    { name: 'Extrême', value: 3420, color: '#10b981' },
                ]
            },
            {
                type: 'tip',
                title: "Attention au sur-estimation",
                text: "La plupart des gens sur-estiment leur niveau d'activité. Si tu as un travail de bureau et que tu t'entraînes 3×/semaine, tu es probablement « Légèrement actif » (×1.375) et non « Modérément actif ». Commence conservateur et ajuste.",
                icon: Target,
                variant: 'amber',
            },
            { type: 'divider' },

            // ── TDEE ET BALANCE CALORIQUE ──────────────────
            {
                type: 'heading',
                text: "TDEE et balance calorique",
                icon: Scale,
            },
            {
                type: 'paragraph',
                text: "Ton TDEE est ton **point d'équilibre**. C'est le nombre de calories où tu ne prends ni ne perds de poids. Tout se joue autour de ce chiffre :"
            },
            {
                type: 'stats',
                items: [
                    { value: "−500", label: "kcal/jour = perdre ~0.5 kg/sem", icon: TrendingUp },
                    { value: "=TDEE", label: "= maintien du poids", icon: Scale },
                    { value: "+300", label: "kcal/jour = prise de muscle", icon: Dumbbell },
                ]
            },
            {
                type: 'paragraph',
                text: "Un **déficit de 500 kcal/jour** correspond à environ **3500 kcal/semaine**, soit environ 0.45 kg de graisse perdue. Pour un surplus (prise de masse), vise **+200 à +400 kcal** pour minimiser le gain de gras."
            },
            {
                type: 'chart',
                chartType: 'bar',
                title: 'Zones caloriques et leurs effets',
                subtitle: 'Pour un TDEE de 2500 kcal/jour',
                unit: ' kcal',
                data: [
                    { name: 'Sèche agressive', value: 1750, color: '#ef4444' },
                    { name: 'Sèche modérée', value: 2000, color: '#f59e0b' },
                    { name: 'Maintien', value: 2500, color: '#22d3ee' },
                    { name: 'Lean bulk', value: 2800, color: '#3b82f6' },
                    { name: 'Prise de masse', value: 3100, color: '#10b981' },
                ]
            },
            { type: 'divider' },

            // ── L'ADAPTIVE THERMOGENESIS ────────────────────
            {
                type: 'heading',
                text: "L'Adaptive Thermogenesis : ton corps résiste",
                icon: TrendingUp,
            },
            {
                type: 'paragraph',
                text: "Quand tu réduis tes calories, ton corps ne reste pas passif. Il **s'adapte** en réduisant ta dépense calorique. C'est l'**adaptive thermogenesis** — et c'est la raison pour laquelle les régimes échouent à long terme."
            },
            {
                type: 'paragraph',
                text: "Concrètement, après 2 à 4 semaines de déficit, ton corps réduit ton NEAT (tu bouges moins inconsciemment), baisse ta production hormonale (T3, testostérone, leptine), et devient plus efficace énergétiquement. Résultat : ton TDEE peut baisser de **200 à 500 kcal/jour** au-delà de la simple perte de poids."
            },
            {
                type: 'tip',
                title: "Comment contrer l'adaptation",
                text: "1. Ne descends jamais en dessous de MB − 200 kcal par jour\n2. Inclus des « diet breaks » de 1-2 semaines au maintien toutes les 6-8 semaines\n3. Maintiens un apport protéique élevé (1.8-2.2g/kg)\n4. Continue la musculation lourde pour préserver la masse musculaire\n5. Surveille ton nombre de pas quotidien — il chute souvent sans qu'on s'en rende compte",
                icon: Zap,
                variant: 'cyan',
            },
            { type: 'divider' },

            // ── OPTIMISER CHAQUE COMPOSANTE ─────────────────
            {
                type: 'heading',
                text: "Optimiser chaque composante du TDEE",
                icon: Zap,
            },
            {
                type: 'tip',
                title: "Augmenter ton MB (+100 à +300 kcal)",
                text: "Développe ta masse musculaire via la musculation progressive. Chaque kilo de muscle ajouté brûle environ 13 kcal/jour de plus au repos. 10 kg de muscle = +130 kcal/jour, chaque jour, même au repos.",
                icon: Dumbbell,
                variant: 'cyan',
            },
            {
                type: 'tip',
                title: "Maximiser le TEF (+100 à 200 kcal)",
                text: "Augmente ta consommation de protéines. Les protéines ont un TEF de 20-30%, contre 5-10% pour les glucides et 0-3% pour les lipides. Avec 200g de protéines/jour, tu brûles ~160 kcal juste pour les digérer.",
                icon: Flame,
                variant: 'green',
            },
            {
                type: 'tip',
                title: "Booster ton NEAT (+200 à 800 kcal)",
                text: "C'est le levier le PLUS sous-estimé. Vise 10 000 pas/jour minimum. Travaille debout. Prends les escaliers. Bouge pendant tes pauses. Le NEAT peut compenser une baisse du MB due au régime.",
                icon: Footprints,
                variant: 'blue',
            },
            {
                type: 'tip',
                title: "Dort bien — le levier caché",
                text: "Moins de 7h de sommeil = leptine ↓ (hormone de satiété), ghréline ↑ (hormone de faim), cortisol ↑ (stockage de graisse), testostérone ↓ (perte de muscle). Le manque de sommeil peut réduire ton TDEE de 5 à 20%.",
                icon: Moon,
                variant: 'amber',
            },
            { type: 'divider' },

            // ── COMPARAISON MB vs TDEE ──────────────────────
            {
                type: 'heading',
                text: "MB vs TDEE : la grande image",
                icon: BarChart3,
            },
            {
                type: 'paragraph',
                text: "Voici la comparaison entre le MB seul et le TDEE complet pour différents profils. La différence montre à quel point le mode de vie influence te dépense calorique totale."
            },
            {
                type: 'chart',
                chartType: 'bar',
                title: 'MB vs TDEE par profil',
                subtitle: 'Homme, 80kg — impact du mode de vie',
                unit: ' kcal',
                data: [
                    { name: 'MB seul', value: 1805, color: '#475569' },
                    { name: 'Sédentaire', value: 2166, color: '#ef4444' },
                    { name: 'Actif bureau', value: 2482, color: '#f59e0b' },
                    { name: 'Sportif 4×/sem', value: 2798, color: '#22d3ee' },
                    { name: 'Sportif intense', value: 3114, color: '#3b82f6' },
                    { name: 'Athlète pro', value: 3430, color: '#10b981' },
                ]
            },
            { type: 'divider' },

            // ── RÉSUMÉ ACTIONNABLE ──────────────────────────
            {
                type: 'heading',
                text: "Plan d'action en 5 étapes",
                icon: Target,
            },
            {
                type: 'list',
                items: [
                    {
                        icon: Target,
                        title: "1. Calcule ton MB",
                        text: "Utilise la formule Mifflin-St Jeor ou notre calculateur TDEE intégré à OXYN."
                    },
                    {
                        icon: Activity,
                        title: "2. Estime ton coefficient d'activité",
                        text: "Sois honnête. Mieux vaut sous-estimer et ajuster que sur-estimer et stagner."
                    },
                    {
                        icon: Scale,
                        title: "3. Définis ton objectif calorique",
                        text: "Sèche : TDEE − 300 à 500 kcal. Maintien : TDEE. Prise de masse : TDEE + 200 à 400 kcal."
                    },
                    {
                        icon: Timer,
                        title: "4. Teste pendant 2-3 semaines",
                        text: "Pèse-toi chaque matin, fais la moyenne hebdomadaire. Si tu ne perds/gagnes pas au rythme voulu, ajuste de ±100 kcal."
                    },
                    {
                        icon: TrendingUp,
                        title: "5. Ajuste régulièrement",
                        text: "Ton TDEE change avec ta composition corporelle, ton activité et la durée du régime. Réévalue toutes les 4-6 semaines."
                    },
                ]
            },
            { type: 'divider' },
            {
                type: 'quote',
                text: "Ton TDEE n'est pas un chiffre magique — c'est un point de départ scientifique. Comprendre comment ton corps dépense de l'énergie, c'est posséder la clé de toute transformation physique durable.",
            },
        ]
    },
    {
        id: 2,
        slug: "ratio-ideal-macronutriments",
        category: "Nutrition",
        title: "Le ratio idéal de Macronutriments",
        desc: "Protéines, Lipides, Glucides : comment équilibrer votre assiette pour sécher.",
        time: "4 min",
        Icon: Apple,
        color: "from-blue-500/20",
        gradient: "from-blue-500 to-indigo-600",
        blocks: [
            {
                type: 'paragraph',
                text: "Pour transformer ton physique, il ne suffit pas de manger « moins ». Il faut manger **intelligemment**, en répartissant correctement tes macronutriments : protéines, lipides, glucides."
            },
            {
                type: 'paragraph',
                text: "Chaque macro a un rôle biologique précis, et les négliger — même en déficit calorique — peut saboter tes résultats."
            },
            { type: 'divider' },
            {
                type: 'heading',
                text: "Les Protéines : le pilier de la sèche",
                icon: Beef,
            },
            {
                type: 'stats',
                items: [
                    { value: "1.6–2.2g", label: "par kg de poids / jour", icon: Target },
                    { value: "20–30%", label: "d'effet thermique", icon: Flame },
                    { value: "128–176g", label: "pour un homme de 80kg", icon: Scale },
                ]
            },
            {
                type: 'paragraph',
                text: "Les protéines sont essentielles pour **préserver ta masse musculaire** en période de déficit calorique. Elles ont aussi l'effet thermique le plus élevé : ton corps dépense environ **20 à 30%** de l'énergie des protéines juste pour les digérer."
            },
            {
                type: 'tip',
                title: "Sources à privilégier",
                text: "Poulet, dinde, poisson blanc, œufs, fromage blanc 0%, whey, légumineuses.",
                icon: Apple,
                variant: 'green',
            },
            { type: 'divider' },
            {
                type: 'heading',
                text: "Les Lipides : ne les supprimez jamais",
                icon: Droplets,
            },
            {
                type: 'paragraph',
                text: "Les lipides sont indispensables à la production hormonale (testostérone, œstrogènes), à l'absorption des vitamines liposolubles (A, D, E, K) et à la santé cellulaire."
            },
            {
                type: 'tip',
                title: "Minimum vital",
                text: "0.8g à 1.2g par kg de poids corporel. Un apport trop bas provoque fatigue, chute de libido et mauvaise récupération.",
                icon: Heart,
                variant: 'amber',
            },
            { type: 'divider' },
            {
                type: 'heading',
                text: "Les Glucides : le carburant de la performance",
                icon: Wheat,
            },
            {
                type: 'paragraph',
                text: "Les glucides sont ta source d'énergie principale pour l'entraînement intense. En sèche, ce sont eux que l'on ajuste en premier, mais sans jamais les supprimer totalement. Généralement entre **2 et 4g par kg** selon ton niveau d'activité."
            },
            { type: 'divider' },
            {
                type: 'heading',
                text: "Exemple concret : homme de 80 kg en sèche",
                icon: BarChart3,
            },
            {
                type: 'stats',
                items: [
                    { value: "160g", label: "Protéines — 640 kcal (29%)", icon: Beef },
                    { value: "75g", label: "Lipides — 675 kcal (31%)", icon: Droplets },
                    { value: "221g", label: "Glucides — 885 kcal (40%)", icon: Wheat },
                ]
            },
            {
                type: 'tip',
                title: "Budget total",
                text: "2200 kcal/jour avec un déficit calorique modéré pour une sèche efficace et durable.",
                icon: Target,
                variant: 'cyan',
            },
            { type: 'divider' },
            {
                type: 'chart',
                chartType: 'pie',
                title: 'Répartition des macros — 2200 kcal',
                subtitle: 'Homme de 80kg en sèche',
                unit: ' kcal',
                data: [
                    { name: 'Protéines', value: 640, color: '#22d3ee' },
                    { name: 'Lipides', value: 675, color: '#f59e0b' },
                    { name: 'Glucides', value: 885, color: '#10b981' },
                ]
            },
            { type: 'divider' },
            {
                type: 'chart',
                chartType: 'bar',
                title: 'Effet thermique par macronutriment',
                subtitle: 'Calories brûlées pour digérer 100 kcal',
                unit: ' kcal',
                data: [
                    { name: 'Protéines', value: 25, color: '#22d3ee' },
                    { name: 'Glucides', value: 8, color: '#10b981' },
                    { name: 'Lipides', value: 3, color: '#f59e0b' },
                ]
            },
            { type: 'divider' },
            {
                type: 'quote',
                text: "Le ratio parfait n'existe pas de manière universelle, mais les principes restent les mêmes : priorité aux protéines, ne jamais couper les lipides trop bas, et ajuster les glucides selon ta dépense.",
            },
        ]
    },
    {
        id: 3,
        slug: "neat-cle-invisible-perte-de-gras",
        category: "Training",
        title: "NEAT : La clé invisible de la perte de gras",
        desc: "Comment augmenter votre dépense énergétique sans même aller à la salle.",
        time: "6 min",
        Icon: Dumbbell,
        color: "from-indigo-500/20",
        gradient: "from-indigo-500 to-purple-600",
        blocks: [
            {
                type: 'paragraph',
                text: "Le NEAT (Non-Exercise Activity Thermogenesis) représente toutes les calories que ton corps brûle en dehors du sport : marcher, monter les escaliers, faire le ménage, gesticuler, rester debout, taper au clavier..."
            },
            {
                type: 'tip',
                title: "Chiffre clé",
                text: "Chez certaines personnes, la différence de NEAT peut représenter jusqu'à 2000 kcal par jour. C'est gigantesque.",
                icon: Zap,
                variant: 'cyan',
            },
            { type: 'divider' },
            {
                type: 'heading',
                text: "Pourquoi le NEAT est si important en sèche",
                icon: TrendingUp,
            },
            {
                type: 'paragraph',
                text: "Quand tu réduis tes calories, ton corps s'adapte. Et l'une des premières choses qu'il fait, c'est **réduire ton NEAT inconsciemment**. Tu bouges moins. Tu es plus fatigué. Tu restes assis plus longtemps."
            },
            {
                type: 'paragraph',
                text: "C'est ce qu'on appelle l'adaptive thermogenesis. Ton corps essaie de compenser le déficit en dépensant moins. Résultat : **ta perte de poids stagne**, alors que tu manges « peu »."
            },
            { type: 'divider' },
            {
                type: 'heading',
                text: "Les chiffres du NEAT",
                icon: BarChart3,
            },
            {
                type: 'stats',
                items: [
                    { value: "200–400", label: "kcal/jour — Sédentaire", icon: Monitor },
                    { value: "500–800", label: "kcal/jour — Modérément actif", icon: Footprints },
                    { value: "1000–2000", label: "kcal/jour — Très actif", icon: Zap },
                ]
            },
            {
                type: 'paragraph',
                text: "Pour context, une séance de musculation de 60 min brûle en moyenne 200–400 kcal. Ton NEAT peut représenter **3 à 5 fois** cette valeur."
            },
            { type: 'divider' },
            {
                type: 'chart',
                chartType: 'bar',
                title: 'NEAT selon le niveau d\'activité',
                subtitle: 'Dépense calorique quotidienne hors sport',
                unit: ' kcal',
                data: [
                    { name: 'Sédentaire', value: 300, color: '#ef4444' },
                    { name: 'Peu actif', value: 550, color: '#f59e0b' },
                    { name: 'Modéré', value: 800, color: '#22d3ee' },
                    { name: 'Actif', value: 1200, color: '#3b82f6' },
                    { name: 'Très actif', value: 1800, color: '#10b981' },
                ]
            },
            { type: 'divider' },
            {
                type: 'chart',
                chartType: 'pie',
                title: 'Composition de ta dépense quotidienne',
                subtitle: 'Personne modérément active',
                unit: ' kcal',
                data: [
                    { name: 'Métabolisme basal', value: 1600, color: '#6366f1' },
                    { name: 'NEAT', value: 700, color: '#22d3ee' },
                    { name: 'Sport', value: 300, color: '#3b82f6' },
                    { name: 'Digestion (TEF)', value: 200, color: '#8b5cf6' },
                ]
            },
            { type: 'divider' },
            {
                type: 'heading',
                text: "Comment augmenter ton NEAT",
                icon: ArrowUp,
            },
            {
                type: 'list',
                items: [
                    {
                        icon: Footprints,
                        title: "Marche quotidienne",
                        text: "Vise 8 000 à 12 000 pas par jour. Une marche de 30 min après chaque repas = ~300 kcal supplémentaires."
                    },
                    {
                        icon: ArrowUp,
                        title: "Privilégie les escaliers",
                        text: "La montée d'escaliers est un effort intense qui active les quadriceps, les fessiers et le système cardiovasculaire."
                    },
                    {
                        icon: Monitor,
                        title: "Travaille debout",
                        text: "Un bureau debout ou alterner assis/debout augmente le NEAT de manière significative sur la journée."
                    },
                    {
                        icon: Coffee,
                        title: "Bouge pendant les pauses",
                        text: "Au lieu de scroller sur ton téléphone, fais 5 min de marche. Sur une journée, ça fait 30 à 40 min de mouvement."
                    },
                    {
                        icon: ShoppingBag,
                        title: "Fais tes courses à pied",
                        text: "Si possible, remplace les trajets en voiture par de la marche ou du vélo."
                    },
                ]
            },
            { type: 'divider' },
            {
                type: 'quote',
                text: "Le NEAT est la variable cachée qui fait la différence entre ceux qui sèchent facilement et ceux qui stagnent. Ce n'est pas une question de volonté, c'est une question de système."
            },
        ]
    }
];
