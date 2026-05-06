# Plainfilings

En software-as-a-service tjänst som skall ge användare direkt data från finansiella rapporter världen över.

### Mål med strukturen

Målet med detta projekt är att göra en demonstration av latens, och dess påverkan på större delar av ett system. Alltså att kartlägga latensen i varje steg, och visualisera detta och lagra resultaten som historik.

![System Schema](system-schema.png)

### Stack

Redis för caching möjligheter, Couch DB kommer användas för att lagra rapporter och användardata (watchlists, m.m)

React med Vite kommer användas till frontend, eftersom detta är en reaktiv applikation som kommer vara beroende av live-data, vi kommer bygga frontend som ett skal med API:er alltså, och sen servas det med Nginx.

För inferens och förståelse av data mängderna kommer vi rulla en egen LLM, gemma-2-9b. För att slippa en dedikerad GPU kommer vi använda oss av quantized version som drar ner minnes förbrukningen. Sen får vi se om det är nog snabbt eller om modellen behöver en GPU i alla fall.

För auth och billing kommer Clerk användas då det är en färdig lösning som underlättar utvecklingen. De sköter dessutom API nycklar till användare när det behovet dyker upp senare.
