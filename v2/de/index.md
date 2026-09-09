# Wallet, Karte und Bankkonto für deinen Agenten.

> Eine selbstverwahrte Wallet, Visa-Karte und ein Bankkonto für deinen Agenten. Alltag im Chat erledigen oder deinen Agenten per MCP verbinden. Kein Integrations-API-Key.

Geld senden. Dinge kaufen. Zeit für dich. Krypto, Stablecoins und dein Geld im Alltag. Sag deinem Agenten einfach, was du brauchst.

## Dein Geld. Deine Entscheidung.

### Deine eigene Wallet

Krypto und Stablecoins in einer selbstverwahrten Wallet. Verbinde das Konto, das du kontrollierst.

### Eine Karte für deinen Agenten

Visa-Karte ausstellen, Umsätze ansehen, Limits setzen und die Karte einfrieren. Direkt im Gespräch.

### Ein Bankkonto dazu

EUR-IBAN und SEPA, dazu USD-ACH, wo verfügbar. Wohnsitz und Verifizierung bestimmen die Verfügbarkeit.

### Berechtigungen statt Blankoscheck

Wähle Limits und Zugriffsrechte. Prüfe die Details, bevor du Zugriff oder eine Zahlung freigibst.

### Geld über Grenzen

Prüfe verfügbare Auszahlungswege, Gebühren und den Empfangsbetrag, bevor du bestätigst.

### Nützliche Dienste bezahlen

Unterstützte Dienste nach Nutzung bezahlen. Dein Agent bleibt innerhalb deiner gesetzten Limits.

## Was möchtest du erledigen?

Ein Satz statt noch einer App. Das sind Beispielaufgaben: Dein Agent braucht passende Dienste, Zugang zu deinen Konten und deine Zahlungsfreigabe.

### Zwei Tickets. Gute Plätze.

Buche zwei Kinotickets für Freitagabend. Suche Plätze nebeneinander und frage mich vor dem Bezahlen.

### Geld nach Hause senden.

Hilf mir, meiner Frau in Tansania Geld zu schicken. Prüfe Auszahlungsmöglichkeiten, Gebühren und ihren Empfangsbetrag, bevor ich freigebe.

### Flug finden. Flug buchen.

Suche Flüge für meine nächste Reise, vergleiche den Gesamtpreis inklusive Gepäck und buche meine Auswahl nach meiner Freigabe.

### Genau das richtige Teil.

Finde einen Displayschutz für mein iPhone SE. Frage nach der Generation, prüfe Passform und Lieferung und zeige mir vor dem Kauf den Gesamtpreis.

### Eine echte Postkarte für Mama.

Hilf mir, eine Postkarte zu drucken und an meine Mutter zu schicken. Frage nach Foto, Nachricht und Postanschrift und zeige mir den Preis.

### Du, mit einer Pointe.

Hilf mir mit meinem eigenen Gesicht und meiner Stimme, ein lustiges Avatar-Video mit einem Witz für Instagram zu machen. Frage nach meiner Einwilligung und den Aufnahmen. Vor dem Posten möchte ich es prüfen.

## Gib deinem Agenten eine Bank.

Eine URL verbindet die Zahlungstools. Kein Integrations-API-Key. Kein neues Dashboard lernen.

Verbinde meinen Agenten über seinen nativen HTTP-MCP-Client mit https://wirex.nuri.com/mcp. Für die Tool-Erkennung ist kein API-Key nötig. Initialisiere den Server, lies seine Anweisungen und lade den aktuellen Tool-Katalog. Verlasse dich nicht auf zwischengespeicherte Aktionen. Nenne mir die Umgebung und Verfügbarkeit. Wenn ich mich verbinden möchte, rufe connect_wallet auf, öffne den exakten sicheren Freigabelink und behalte die Session privat. Folge den zurückgegebenen nächsten Schritten, frage nur nach fehlenden Angaben und erhalte Zahlungsreferenzen bei Wiederholungen. Behaupte keinen Zahlungs- oder Kauferfolg ohne zurückgegebenes Ergebnis. Hilf mir auf Deutsch beim Start.

```sh
hermes mcp add payments --url https://wirex.nuri.com/mcp
hermes mcp test payments
```

## Gut zu wissen.

### Muss ich Krypto verstehen?

Nein. Frag in Alltagssprache. Dein Agent sollte Betrag, Gebühren und Freigabe erklären, bevor du handelst. Wallet-Einrichtung und Identitätsprüfung können trotzdem nötig sein.

### Ist alles selbstverwahrt?

Die Wallet ist selbstverwahrt. Karten, Fiat-Guthaben und Banküberweisungen laufen über Finanzdienstleister mit eigenen Bedingungen und Compliance-Regeln. Selbstverwahrung bedeutet nicht, dass Bank- oder Kartenguthaben niemals eingeschränkt werden können.

### Kann ich in Telegram oder WhatsApp starten?

Das ist das Ziel, ebenso wie iMessage, Signal und E-Mail. Diese V2-Vorschau hat noch keine verifizierten öffentlichen Anmeldelinks für diese Kanäle. Webchat und dein eigener Agent per MCP sind jetzt nutzbar.

### Kann der Agent schon alle Beispiele erledigen?

Nicht allein mit dem Zahlungs-MCP. Shopping und Buchungen brauchen zusätzlich Browser-Funktionen, Zugang zu deinen Händlerkonten und unterstützte Checkouts. Tansania-Auszahlungen und Avatar-Videos benötigen einen geprüften Anbieter. Die Beispiele sind Aufgabenideen, keine Kaufbestätigungen.

### Was ist in dieser Vorschau live?

Der Webchat lädt den aktuellen Wirex-MCP und nutzt dessen Zahlungstools. Die verbundene Umgebung ist eine Sandbox. Ein verfügbares Tool beweist weder einen echten Kartenkauf noch eine Auszahlung oder abgeschlossenes KYC. Dein Agent muss vor dem Handeln die aktuelle Verfügbarkeit prüfen.

## Links

- [MCP integration](https://paymentrequired.com/v2/integration.md)
- [Capabilities](https://paymentrequired.com/v2/capabilities.json)
- [Live MCP](https://wirex.nuri.com/mcp)
- [Web page](https://paymentrequired.com/v2/de/)
