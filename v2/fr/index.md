# Le portefeuille, la carte et le compte bancaire de votre agent.

> Un portefeuille en garde autonome, une carte Visa et un compte bancaire pour votre agent. Des paiements par chat ou une URL MCP pour votre agent. Sans clé API d'intégration.

Envoyez. Achetez. Profitez de votre journée. Crypto, stablecoins et argent du quotidien. Dites simplement à votre agent ce dont vous avez besoin.

## Votre argent. Votre décision.

### Votre propre portefeuille

Gardez vos cryptos et stablecoins dans un portefeuille en garde autonome. Connectez le compte que vous contrôlez.

### Une carte pour votre agent

Créez une Visa, consultez l'activité, fixez les plafonds et bloquez-la depuis une conversation.

### Un compte bancaire aussi

IBAN en euros et SEPA, plus ACH en dollars selon disponibilité. L'accès dépend du pays de résidence et de la vérification.

### Des permissions, pas un chèque en blanc

Choisissez limites et accès. Vérifiez les détails avant d'autoriser un accès ou un paiement.

### De l’argent au-delà des frontières

Vérifiez les moyens de réception, les frais et le montant reçu avant de confirmer.

### Payer des services utiles

Payez à l’usage les services compatibles, dans les limites fixées pour votre agent.

## Que souhaitez-vous faire ?

Une phrase plutôt qu'une application de plus. Ces exemples nécessitent les bons services, l'accès à vos comptes et votre autorisation de paiement.

### Deux billets. Les bonnes places.

Réserve deux places de cinéma pour vendredi soir. Trouve deux sièges côte à côte et demande-moi avant de payer.

### Envoyer de l'argent au pays.

Aide-moi à envoyer de l'argent à ma femme en Tanzanie. Vérifie les options de réception, les frais et le montant reçu avant mon accord.

### Trouver le vol. Le réserver.

Cherche des vols pour mon prochain voyage, compare le prix total avec bagages et réserve mon choix après mon accord.

### Le petit accessoire parfait.

Trouve une protection d'écran pour mon iPhone SE. Demande la génération, vérifie la compatibilité et la livraison puis montre-moi le total avant achat.

### Une vraie carte postale pour maman.

Aide-moi à imprimer et envoyer une carte postale à ma mère. Demande la photo, le message et l'adresse postale puis montre-moi le prix.

### Vous, avec la chute.

Avec mon propre visage et ma voix, aide-moi à créer une vidéo drôle d'avatar racontant une blague pour Instagram. Demande mon consentement et les enregistrements ; laisse-moi vérifier avant publication.

## Donnez une banque à votre agent.

Une URL connecte les outils de paiement. Sans clé API d'intégration ni nouveau tableau de bord.

Connecte mon agent à https://wirex.nuri.com/mcp avec son client HTTP MCP natif. Aucune clé API n'est nécessaire pour découvrir les outils. Initialise le serveur, lis ses instructions et charge les outils actuels sans supposer une liste en cache. Indique l'environnement et la disponibilité. Quand je choisis de me connecter, appelle connect_wallet, ouvre son lien sécurisé exact et garde la session privée. Suis les étapes renvoyées, demande seulement les informations manquantes et conserve les références de paiement lors des reprises. N'annonce aucun paiement ou achat réussi sans résultat reçu. Aide-moi à commencer en français.

```sh
hermes mcp add payments --url https://wirex.nuri.com/mcp
hermes mcp test payments
```

## Bon à savoir.

### Faut-il comprendre la crypto ?

Non. Posez vos questions normalement. L'agent doit expliquer montant, frais et autorisation. La configuration du portefeuille et une vérification d'identité peuvent rester nécessaires.

### Tout est-il en garde autonome ?

Le portefeuille l'est. Les cartes, soldes fiat et virements passent par des prestataires financiers avec leurs propres conditions. La garde autonome ne garantit pas l'absence de restrictions sur les comptes bancaires ou cartes.

### Puis-je commencer sur Telegram ou WhatsApp ?

C'est l'objectif, avec iMessage, Signal et email. Cet aperçu V2 ne dispose pas encore de liens publics d'inscription vérifiés pour ces canaux. Le chat web et la connexion de votre agent via MCP sont disponibles.

### L'agent peut-il déjà faire tous ces exemples ?

Pas avec le seul MCP de paiement. Achats et réservations demandent un navigateur, vos comptes marchands et des services compatibles. La Tanzanie et les avatars demandent des prestataires vérifiés. Ce sont des idées, pas des confirmations d'achat.

### Qu'est-ce qui fonctionne dans cet aperçu ?

Le chat web découvre le MCP Wirex et utilise ses outils actuels. L'environnement est un sandbox. Un outil disponible ne prouve ni achat réel, ni versement, ni KYC terminé. L'agent doit vérifier avant d'agir.

## Links

- [MCP integration](https://paymentrequired.com/v2/integration.md)
- [Capabilities](https://paymentrequired.com/v2/capabilities.json)
- [Live MCP](https://wirex.nuri.com/mcp)
- [Web page](https://paymentrequired.com/v2/fr/)
